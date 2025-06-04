import CollapsibleCard from "../CollapsibleCard/collapsibleCard";

export default function PublicFAQ() {
  return (
    <div className="mb-20 flex w-full flex-col gap-8 place-self-center">
      <h2 className="text-center text-2xl md:text-start md:text-3xl">
        Perguntas Frequentes
      </h2>
      <div className="flex w-[85%] flex-col gap-8 place-self-center">
        <CollapsibleCard title="O que é CEMEI?">
          <p className="px-8 pt-8 text-xl">
            A CEMEI é uma empresa de tecnologia educacional que desenvolveu um
            Observatório da Igualdade Educativa (OIE) em parceria com o
            Instituto Universitário de Criatividade e Inovações Educativas
            (IUCIE) da Universidade de Valência/ES, para avaliar os planos
            municipais de educação de municípios brasileiros, metas atingidas e
            outras métricas relevantes.
          </p>
          <p className="px-8 pb-6 text-xl">
            A empresa possui esse nome pois significa, semear, construir e
            compartilhar novos conhecimentos e experiências, na perspectiva da
            integração entre vários continentes e sabedorias diversas da
            experiência humana.
          </p>
        </CollapsibleCard>

        <CollapsibleCard title="O que é o PME?">
          <p className="p-8 text-xl">
            O Plano Municipal de Educação (PME) é um documento que define metas
            e estratégias para melhorar a educação no município pelos próximos
            10 anos. Ele foi construído com base na realidade local e envolve
            temas como valorização dos profissionais da educação, acesso à
            escola, qualidade do ensino e gestão democrática.
          </p>
        </CollapsibleCard>

        <CollapsibleCard title="Como cobrar avanços do meu município?">
          <p className="p-8 text-xl">
            Você pode cobrar avanços do seu município acompanhando os dados
            disponíveis na plataforma, verificando se as metas do PME estão
            sendo cumpridas e participando dos espaços de diálogo, como
            audiências públicas e conselhos de educação. Com essas informações
            em mãos, é possível questionar gestores, propor melhorias e
            mobilizar a comunidade para fortalecer as políticas educacionais. A
            participação da sociedade é essencial para garantir que os
            compromissos assumidos no plano sejam colocados em prática.
          </p>
        </CollapsibleCard>

        <CollapsibleCard title="Como posso visualizar os dados do PME?">
          <p className="p-8 text-xl">
            Os dados do PME estão organizados por metas e estratégias. Ao
            acessar o plano da sua cidade, você verá uma visão geral com
            gráficos e indicadores que mostram o andamento de cada meta. Também
            é possível visualizar relatórios detalhados com os avanços e
            desafios identificados.
          </p>
        </CollapsibleCard>
      </div>
    </div>
  );
}
