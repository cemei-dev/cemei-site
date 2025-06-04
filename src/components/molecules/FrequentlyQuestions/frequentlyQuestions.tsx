"use client";

import CollapsibleCard from "../CollapsibleCard/collapsibleCard";

export default function FrequentlyQuestions() {
  return (
    <div className="flex flex-col gap-8">
      <CollapsibleCard title="O que é CEMEI?">
        <p className="mb-4">
          A CEMEI é uma empresa de tecnologia educacional que desenvolveu um
          Observatório da Igualdade Educativa (OIE) em parceria com o Instituto
          Universitário de Criatividade e Inovações Educativas (IUCIE) da
          Universidade de Valência/ES, para avaliar os planos municipais de
          educação de municípios brasileiros, metas atingidas e outras métricas
          relevantes.
        </p>
        <p>
          A empresa possui esse nome pois significa semear, construir e
          compartilhar novos conhecimentos e experiências, na perspectiva da
          integração entre vários continentes e sabedorias diversas da
          experiência humana.
        </p>
      </CollapsibleCard>

      <CollapsibleCard title="Como cobrar avanços do meu município?">
        <p className="mb-4">
          A partir dos dados e relatórios fornecidos pela CEMEI, qualquer
          cidadão pode analisar o desempenho do seu município em relação ao
          Plano Municipal de Educação.
        </p>
        <p>
          Com essas informações em mãos, é possível participar de audiências
          públicas, dialogar com gestores e cobrar políticas que estejam
          alinhadas às metas educacionais.
        </p>
      </CollapsibleCard>

      <CollapsibleCard title="Como posso visualizar os dados do PME?">
        <p className="mb-4">
          Os dados estão disponíveis através da plataforma digital da CEMEI, que
          pode ser acessada por qualquer pessoa. Lá você encontra gráficos,
          indicadores e relatórios organizados por município.
        </p>
        <p>
          Também é possível baixar documentos e fazer comparações entre regiões
          ou entre anos distintos.
        </p>
      </CollapsibleCard>

      <CollapsibleCard title="Como a CEMEI apoia a educação no Brasil?">
        <p className="mb-4">
          A CEMEI atua em parceria com prefeituras, secretarias de educação e
          universidades para capacitar profissionais da educação e melhorar a
          gestão pública educacional.
        </p>
        <p>
          Seus estudos ajudam a identificar desigualdades, propor soluções e
          monitorar o progresso dos planos de educação em nível municipal.
        </p>
      </CollapsibleCard>
    </div>
  );
}
