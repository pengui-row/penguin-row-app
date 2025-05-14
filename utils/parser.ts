export class Parser {
    timeFromTimeStamp(timeStamp: string | any) {
        if (!timeStamp) return ""
        const before = new Date(timeStamp);
        const after = new Date();
        const difference = Math.floor((after.getTime() - before.getTime()) / 1000);
        if (difference < 60) {
            return `${difference}s`
        }
        else if (difference < 3600) {
            const minutes = Math.floor(difference / 60);
            return `${minutes}m`;
        } else if (difference < 86400) {
            const hours = Math.floor(difference / 3600);
            return `${hours}h`;
        } else {
            const days = Math.floor(difference / 86400);
            return `${days}d`;
  }
    }
}