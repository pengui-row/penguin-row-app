import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Card from "@/components/Card";
import Logo from "@/components/Logo";
import Toast from "@/components/Toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<{
    title: string;
    message: string;
    type: "success" | "failure";
  }>({
    title: '',
    message: '',
    type: 'success'
  });

  // Función para validar formato de correo
  const isValidEmail = (email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Regex para validar el email
    return emailRegex.test(email);
  };

  const showToast = (title: string, message: string, type: 'success' | 'failure' = 'success') => {
    setToastConfig({ title, message, type });
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  const signInWithEmail = () => {
    if (!email || !password) {
      showToast("Datos incorrectos", "Por favor llena todos los campos.", 'failure');
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Correo inválido", "Por favor ingresa un correo válido.", 'failure');
      return;
    }

    // Proceder con la autenticación si los campos son válidos
    setLoading(true);
    showToast("Inicio exitoso", "Redirigiendo...", 'success');
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)");
    }, 1000);
  };

  const signUpWithEmail = () => {
    router.push("/register/Register");
  };

  const recoverPassword = () => {
    router.push('/recover/RecoverPassword');
  }
  return (
    <Card>
      <Logo displayText={true} />

      <Title content="Iniciar Sesión" />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
        <Button
          onPress={signUpWithEmail}
          title="Regístrate"
          style={styles.registerButton}
          textStyle={styles.registerLink}
        />
      </View>

      <Input
        label="Correo"
        placeholder="rafaelcarmona@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        label="Contraseña"
        placeholder="••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />

      <View style={styles.optionsRow}>
        <View style={styles.rememberContainer}>
          <Checkbox
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberText}>Recordarme</Text>
        </View>

        <Button
          onPress={recoverPassword}
          title="¿Olvidaste la contraseña?"
          style={styles.forgotPasswordButton}
          textStyle={styles.forgotPassword}
        />
      </View>

      <Button
        onPress={signInWithEmail}
        title={loading ? "Cargando..." : "Iniciar Sesión"}
        disabled={loading}
      />
      <Toast
        visible={toast}
        title={toastConfig.title}
        message={toastConfig.message}
        type={toastConfig.type}
        onClose={() => setToast(false)}
        autoCloseDelay={5000}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  registerLink: {
    color: "#1e3a6e",
    fontSize: 14,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "transparent",
    padding: 0,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  forgotPassword: {
    color: "#1e3a6e",
    fontSize: 14,
  },
  forgotPasswordButton: {
    backgroundColor: "transparent",
    padding: 0,
  },
});

export default Login;
