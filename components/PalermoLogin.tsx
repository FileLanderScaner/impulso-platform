import React, { useState } from "react";
import { Check, Copy, Globe, Mail, HelpCircle, Smartphone, MonitorSmartphone } from "lucide-react";
const LANGS = [
  { code: "es-AR", label: "Español (Argentina)" },
  { code: "es-ES", label: "Español (España)" },
  { code: "en", label: "English" },
  { code: "pt-BR", label: "Português (Brasil)" },
];

const MFA_KEY = "IMPULSO-PLATAFORMA-2025";

export default function PalermoLogin() {
  const [step, setStep] = useState<"login" | "mfa-setup" | "mfa-code" | "welcome">("login");
  const [lang, setLang] = useState("es-AR");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Simulación de login
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStep("mfa-setup");
  }
  function handleCopy() {
    navigator.clipboard.writeText(MFA_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  function handleMfaSetupNext() {
    setStep("mfa-code");
  }
  function handleMfaCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("welcome");
  }
  function handleBack() {
    setStep("login");
  }
  function handleCancel() {
    setStep("login");
    setUser(""); setPass(""); setMfaCode("");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 animate-fade-in">
        {/* Selector de idioma */}
        <div className="flex justify-end gap-2 mb-2">
          <Globe className="h-5 w-5 text-gray-400" />
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`px-2 py-1 rounded text-xs font-semibold border transition ${lang === l.code ? "bg-primary/10 border-primary text-primary" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Login */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <img src="/logo.svg" alt="Logo Impulso" className="h-14 mx-auto mb-2 drop-shadow" />
            <h2 className="text-2xl font-extrabold text-center mb-2 text-primary">Bienvenido a Impulso</h2>
            <p className="text-center text-gray-500 text-sm mb-2">Accede a tu cuenta para continuar tu aprendizaje y avanzar en tu carrera.</p>
            <input
              type="text"
              placeholder="Usuario o email"
              className="px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              value={user}
              onChange={e => setUser(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
            />
            <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded transition">Siguiente</button>
          </form>
        )}

        {/* MFA Setup */}
        {step === "mfa-setup" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-primary">Configura la autenticación en dos pasos</h2>
            <p className="text-gray-600 text-sm text-center">Descarga una app de autenticación como <span className="font-semibold">Google Authenticator</span> o <span className="font-semibold">Authy</span> en tu teléfono para mayor seguridad.</p>
            <div className="flex items-center gap-2 bg-gray-50 rounded p-3 border border-gray-200">
              <span className="font-mono text-primary text-sm">{MFA_KEY}</span>
              <button onClick={handleCopy} className="ml-2 p-1 rounded hover:bg-primary/10 transition" type="button">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
              </button>
              {copied && <span className="text-xs text-green-600 ml-2">Se copió la clave</span>}
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={handleCancel} className="text-gray-500 hover:underline text-xs">Cancelar</button>
              <button onClick={handleMfaSetupNext} className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded transition text-xs">Siguiente</button>
            </div>
          </div>
        )}

        {/* MFA Code */}
        {step === "mfa-code" && (
          <form onSubmit={handleMfaCodeSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center text-primary">Verifica tu identidad</h2>
            <p className="text-gray-600 text-sm text-center">Ingresa el código de 6 dígitos generado por tu app de autenticación.</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              minLength={6}
              placeholder="Código de 6 dígitos"
              className="px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-primary outline-none text-center tracking-widest font-mono text-lg"
              value={mfaCode}
              onChange={e => setMfaCode(e.target.value.replace(/\D/g, ""))}
              required
            />
            <div className="flex gap-2 justify-between">
              <button onClick={handleBack} type="button" className="text-gray-500 hover:underline text-xs">Volver</button>
              <button onClick={handleCancel} type="button" className="text-gray-500 hover:underline text-xs">Cancelar</button>
              <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded transition text-xs">Enviar</button>
            </div>
          </form>
        )}

        {/* Bienvenida */}
        {step === "welcome" && (
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.svg" alt="Logo Impulso" className="h-14 mb-2 drop-shadow" />
            <h2 className="text-2xl font-extrabold text-center text-primary">¡Bienvenido a Impulso!</h2>
            <p className="text-center text-gray-500 text-sm">Ya puedes acceder a todos los cursos, foros y certificados de la plataforma.</p>
            <div className="flex gap-4 my-2">
              <a href="#" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-xs font-semibold"><Smartphone className="h-5 w-5" /> iTunes</a>
              <a href="#" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded px-3 py-2 text-xs font-semibold"><MonitorSmartphone className="h-5 w-5" /> Google Play</a>
            </div>
            <button onClick={handleCancel} className="text-primary hover:underline text-xs mt-2">Cerrar sesión</button>
          </div>
        )}

        {/* Anuncios del sistema */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded flex items-center gap-2 text-sm mt-2">
          <HelpCircle className="h-5 w-5 text-yellow-500" />
          <span>Mantenimiento programado: <b>10/09/2025</b>. <a href="#" className="underline text-yellow-700">Más info</a></span>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-gray-400 flex flex-col gap-1">
        <div className="flex justify-center gap-4 mb-1">
          <a href="#" className="flex items-center gap-1 hover:underline"><HelpCircle className="h-4 w-4" /> Centro de ayuda</a>
          <a href="mailto:soporte@impulso.com" className="flex items-center gap-1 hover:underline"><Mail className="h-4 w-4" /> soporte@impulso.com</a>
        </div>
        <span>© {new Date().getFullYear()} Impulso. Plataforma educativa.</span>
      </footer>
    </div>
  );
}
