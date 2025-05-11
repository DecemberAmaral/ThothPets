export default function Footer() {
  return (
    <footer className="py-8" style={{ backgroundColor: "#5C4033" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Texto de compromisso */}
        <p className="text-sm text-center mb-4" style={{ color: "#F5DEB3" }}>
          O Thoth é um lugar comprometido com a proteção total dos animais. Qualquer caso de maus-tratos, agressão ou negligência será devidamente denunciado. Se você presenciar situações como as mencionadas, denuncie pelo telefone <strong>0800 61 8080</strong> ou pelo e-mail <strong>linhaverde.sede@ibama.gov.br</strong>. Assim faremos do mundo um lugar mais feliz e saudável.
        </p>
        
        {/* Informações adicionais */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-y-4 md:space-y-0 md:space-x-8 text-center">
          <a href="mailto:linhaverde.sede@ibama.gov.br" className="text-sm font-bold hover:underline" style={{ color: "#F5DEB3" }}>
            Email
          </a>
          <a href="#" className="text-sm font-bold hover:underline" style={{ color: "#F5DEB3" }}>
            Sobre‑nós
          </a>
          <a href="#" className="text-sm font-bold hover:underline" style={{ color: "#F5DEB3" }}>
            Contato
          </a>
          <div className="text-sm font-bold" style={{ color: "#F5DEB3" }}>
            Localização: Av. Minas Gerais 651, Ivaiporã, PR, 86870‑000
          </div>
        </div>

        {/* Ícones das redes sociais */}
        <div className="flex justify-center space-x-6">
          {/* Ícone do Instagram */}
          <a href="#" className="hover:text-emerald-500 transition" style={{ color: "#F5DEB3" }} aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
            </svg>
          </a>

          {/* Ícone do WhatsApp */}
          <a href="#" className="hover:text-emerald-500 transition" style={{ color: "#F5DEB3" }} aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.1-.198.05-.372-.025-.52-.075-.149-.669-1.61-.916-2.205-.242-.579-.487-.5-.67-.51-.173-.007-.372-.009-.57-.009-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.075-.124-.273-.198-.57-.347m-5.421 7.617h-.003A9.87 9.87 0 0 1 6.023 18.19a13.993 13.993 0 0 0 7.548 2.213c4.057 0 7.864-1.992 10.245-5.487a9.87 9.87 0 0 0 2.213-7.548 9.865 9.865 0 0 0-9.87-9.87A9.865 9.865 0 0 0 3.13 8.15a13.993 13.993 0 0 0 2.213 7.548 9.87 9.87 0 0 0 7.548 2.213c1.27 0 2.52-.198 3.683-.574a9.926 9.926 0 0 1-4.418 4.417z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
