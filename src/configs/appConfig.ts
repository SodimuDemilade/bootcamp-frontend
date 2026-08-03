export type AppConfig = {
    baseUrlDev: string;
    baseUrlProd: string;
    stage: "Dev" | "Prod",
}
export const appConfig: AppConfig = {
    baseUrlDev: 'https://devbootcamps.onrender.com/api/v1',
    baseUrlProd: 'http://localhost:8080',
    stage: "Dev",
}
