import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import Card from '@/components/Card';
import Title from '@/components/Title';
import Preference from '@/components/Preference'; // Importa el componente Preference existente
import Button from '@/components/Button';
import Input from '@/components/Input';
import Toast from '@/components/Toast';
import { useAuth } from "../context/AuthContext";
import { router } from 'expo-router';

interface PreferenceItem {
  title: string;
  selected: boolean;
}

const RegisterInfo = () => {
  const [stage, setStage] = useState<1 | 2>(1);
  const token = useAuth();
  const [preferences, setPreferences] = useState<PreferenceItem[]>([
    { title: "Entretenimiento", selected: false },
    { title: "Educación", selected: false },
    { title: "Música", selected: false },
    { title: "Deportes", selected: false },
    { title: "Películas", selected: false },
    { title: "Senderismo", selected: false }
  ]);

  const handlePreferencePress = useCallback((title: string) => {
    setPreferences((prevPreferences) =>
      prevPreferences.map((preference) =>
        preference.title === title
          ? { ...preference, selected: !preference.selected }
          : preference
      )
    );
  }, []);

  const Preferences = ({ onNext }: { onNext: () => void }) => {
    const handlePress = () => {
      console.log(preferences);
      onNext();
    };

    return (
      <View>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarSegment, styles.progressBarSegmentActive]} />
          <View style={[styles.progressBarSegment, styles.progressBarSegmentInactive]} />
        </View>
        <Title content={"Personaliza tu experiencia"} />
        <Text>Elige tus intereses</Text>
        <View>
          {
            preferences.map(({ title, selected }) => (
              <View key={title} style={{ padding: 5 }}>
                <Preference onPress={() => handlePreferencePress(title)} title={title} selected={selected} />
              </View>
            ))
          }
        </View>
        <Button title='Siguiente' onPress={handlePress} />
      </View>
    );
  };

  const Professional = () => {
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [location, setLocation] = useState("");
    const [talents, setTalents] = useState("");
    const [experience, setExperience] = useState("");
    const [toast, setToast] = useState(false);
    const [titleToast, setTitleToast] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"failure" | "success">("failure");
    const [loading, setLoading] = useState(false);

    const showToast = useCallback((title: string, message: string, type: "success" | "failure") => {
      setTitleToast(title);
      setMessage(message);
      setType(type);
      setToast(true);
    }, []);

    const handlePress = async () => {
      if (!professionalTitle || !location || !talents || !experience) {
        showToast("Rellene todos los campos", "Faltan campos por rellenar", "failure");
        return;
      }

      if (!token?.token) {
        showToast("Error", "No se ha podido obtener el token", "failure");
        return;
      }

      if (!token?.userId) {
        showToast("Error", "No se ha podido obtener el id", "failure");
        return;
      }

      const urlapi = process.env.EXPO_PUBLIC_API_URL;
      const url = `${urlapi}/api/auth/userInfo`;
      const apisecret = process.env.EXPO_PUBLIC_API_SECRET;
      const selectedPreferences = preferences.filter(item => item.selected).map(item => item.title);

      try {
        setLoading(true);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`,
            'api-secret': `${apisecret}`
          },
          body: JSON.stringify({
            interests: selectedPreferences,
            professionalTitle,
            location,
            talents,
            experience,
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error en la autenticación');
        }

        showToast("Registro exitoso", "¡Bienvenido!", "success");
        router.push("/(tabs)");
      } catch (error: unknown) {
        console.log(error);
        const errorMessage = error instanceof Error ? error.message : "Error al iniciar sesión";
        showToast("Error", errorMessage, 'failure');
      } finally {
        setLoading(false);
      }
    };

    return (
      <View>
        <View style={styles.progressBar}>
          <Pressable onPress={() => { setStage(1) }} style={[styles.progressBarSegment, styles.progressBarSegmentActiveFull]} />
        </View>
        <Title content={"Crea tu perfil Profesional"} />
        <Input
          label='Título profecional'
          value={professionalTitle}
          onChangeText={setProfessionalTitle}
        />
        <Input
          label='Ubicación'
          value={location}
          onChangeText={setLocation}
        />
        <Input
          label='Habilidades'
          value={talents}
          onChangeText={setTalents}
          multiline
        />
        <Input
          label='Experiencia laboral'
          value={experience}
          onChangeText={setExperience}
          multiline
        />
        <Button title='Enviar' onPress={handlePress} disabled={loading} />
        <Toast
          visible={toast}
          title={titleToast}
          message={message}
          type={type}
          onClose={() => { setToast(false) }}
          autoCloseDelay={5000}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card >
          {stage === 1 && <Preferences onNext={() => setStage(2)} />}
          {stage === 2 && <Professional />}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a6e",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  progressBarSegment: {
    flex: 1,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarSegmentActive: {
    backgroundColor: 'skyblue',
  },
  progressBarSegmentInactive: {
    backgroundColor: 'lightgray',
  },
  progressBarSegmentActiveFull: {
    backgroundColor: 'skyblue',
    flex: 2,
  },
});