//#region Imports

import { MainLayout } from "@/layouts/Index";

import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

//#endregion

export const About = () => {
  return (
    <MainLayout pageTitle="Sobre">
      <section className="container">
        <h1 className="text-3xl font-semibold tracking-wider">
          Sobre o projeto
        </h1>
        <div className="divider mt-2" />
        <article className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <div className="tooltip tooltip-bottom" data-tip="E aí, beleza?">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img
                  src="/images/isaac-hermel.jpg"
                  loading="lazy"
                  alt="Isaac Hermel's picture"
                />
              </div>
            </div>
          </div>
          <p className="sm:w-[65%]">
            O <span className="italic">SenFinança </span>🪙 é um webapp
            desenvolvindo por mim (Isaac Hermel Reginato) como parte do teste
            técnico realizado no processo seletivo para a vaga de Analista Front
            End Pleno da{" "}
            <a
              href="https://sensedata.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SenseData
            </a>
            , empresa especialista no segmento de Sucesso e Experiência do
            Cliente (ou Customer Success e Customer Experience, em inglês).
          </p>
        </article>
        <h2 className="text-2xl mt-4">Tecnologias 🛠️</h2>
        <div className="divider mt-2" />
        <p>Para este projeto foram utilizadas as seguintes tecnologias:</p>
        <ul className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
          <li className="tooltip tooltip-top" data-tip="React, React Router">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=react" />
            </a>
          </li>
          <li className="tooltip tooltip-top" data-tip="ViteJS">
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=vite" />
            </a>
          </li>
          <li
            className="tooltip tooltip-top"
            data-tip="Tailwind CSS, DaisyUI, Postcss, Autoprefixer"
          >
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=tailwind" />
            </a>
          </li>
          <li
            className="tooltip tooltip-top"
            data-tip="JavaScript, LocalStorage, ES6, ESLint"
          >
            <a
              href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=js" />
            </a>
          </li>
          <li className="tooltip tooltip-top" data-tip="Vercel">
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=vercel" />
            </a>
          </li>
          <li className="tooltip tooltip-top" data-tip="VSCode">
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="https://skillicons.dev/icons?i=vscode" />
            </a>
          </li>
        </ul>
        <h2 className="text-2xl mt-4">Contato 📞</h2>
        <div className="divider mt-2" />
        <p>
          Para entrar em contato comigo você pode usar qualquer uma das
          seguintes opções:
        </p>
        <article className="flex flex-wrap gap-4 mt-4">
          <a
            href="mailto:isaachermel@gmail.com"
            className="btn btn-primary flex-grow hover:no-underline"
          >
            <Envelope size={20} weight="bold" />
            E-mail
          </a>
          <a
            href="https://www.linkedin.com/in/isaachermel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-grow hover:no-underline"
          >
            <LinkedinLogo size={20} weight="bold" />
            LinkedIn
          </a>
          <a
            href="https://github.com/h3rmel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-grow hover:no-underline"
          >
            <GithubLogo size={20} weight="bold" />
            GitHub
          </a>
        </article>
      </section>
    </MainLayout>
  );
};
