import { useLoginModel } from "./model";

export function LoginView({
  emailRef,
  passwordRef,
  handleSubmit,
}: ReturnType<typeof useLoginModel>) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <article className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Faça Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              ref={emailRef}
              className="p-2 mt-1 block w-full border border-gray-300 shadow-sm focus:outline-none focus-visible:outline-none rounded-sm hover:border-indigo-500 duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              ref={passwordRef}
              className="p-2 mt-1 block w-full border border-gray-300 shadow-sm focus:outline-none focus-visible:outline-none rounded-sm hover:border-indigo-500 duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 duration-300 hover:bg-indigo-500 h-10 rounded-sm text-white font-medium"
          >
            Entrar
          </button>
        </form>
      </article>
    </section>
  );
}
