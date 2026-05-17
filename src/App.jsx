import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#060B14", surface: "#0D1525", card: "#111D33", border: "#1E2E4A",
  borderLight: "#253659", accent: "#2563EB", gold: "#F0B429", goldDim: "#2D2208",
  green: "#10B981", greenDim: "#0A2018", red: "#EF4444", redDim: "#200A0A",
  amber: "#F59E0B", amberDim: "#251A04", violet: "#8B5CF6", violetDim: "#1A0F35",
  pink: "#EC4899", cyan: "#06B6D4", text: "#E2EAF8", textSub: "#94A3C0",
  textMuted: "#4A5A7A", font: "'Georgia', 'Times New Roman', serif",
  mono: "'Courier New', monospace",
};

// ─── BANCO DE DADOS REAL ──────────────────────────────────────────────────────
const DB = {
  ps: {
    total: 13280,
    periodo: "Jan/2024 – Fev/2026",
    prioridades: { Verde: 6456, Amarelo: 5102, Laranja: 1182, Vermelho: 144, "Não classificado": 396 },
    taxaEvasao: 6.2,
    taxaInternacao: 14.8,
    retorno30d: 14.6,
    tmpMedioMin: 242,
    cidsTop: [
      { cid: "F411", desc: "Ansiedade Generalizada", n: 1213 },
      { cid: "F432", desc: "Reação de Adaptação", n: 1207 },
      { cid: "F419", desc: "Ansiedade NE", n: 733 },
      { cid: "F29",  desc: "Psicose NE", n: 706 },
      { cid: "F430", desc: "Reação Aguda ao Stress", n: 656 },
      { cid: "F200", desc: "Esquizofrenia Paranoide", n: 568 },
      { cid: "F603", desc: "Transt. Borderline", n: 520 },
    ],
    medicos: [
      { nome: "Glauce G. Anselmo", total: 219, internados: 54, taxa: 24.7 },
      { nome: "Plantonista PS", total: 324, internados: 68, taxa: 21.0 },
      { nome: "Jurandir M. Ferreira", total: 2998, internados: 566, taxa: 18.9 },
      { nome: "Nadimila F. Oliveira", total: 172, internados: 32, taxa: 18.6 },
      { nome: "Janaina C. da Silva", total: 2451, internados: 431, taxa: 17.6 },
      { nome: "Julia R. Arana", total: 361, internados: 62, taxa: 17.2 },
      { nome: "Nuno H. Pires", total: 1205, internados: 196, taxa: 16.3 },
      { nome: "Danillo A. Bastos", total: 80, internados: 13, taxa: 16.2 },
    ],
  },
  internacao: {
    total: 997,
    periodo: "2024–2025",
    tmpMedio: 8.2, tmpMediana: 6.0, tmpDp: 7.0, tmpMax: 58,
    motivos: [
      { label: "Alta Melhorada", pct: 66.1 },
      { label: "Transferência", pct: 22.6 },
      { label: "Evasão", pct: 4.2 },
      { label: "Outros", pct: 7.1 },
    ],
    cidsTop: [
      { cid: "F200", desc: "Esq. Paranoide", n: 167 },
      { cid: "F29",  desc: "Psicose NE", n: 152 },
      { cid: "F312", desc: "Bipolar Maníaco", n: 124 },
      { cid: "Z038", desc: "Obs. s/ diagnóstico", n: 109 },
      { cid: "F311", desc: "Bipolar c/ Psicose", n: 32 },
      { cid: "F192", desc: "Depend. Múltiplas", n: 32 },
    ],
    sazonalidade: {
      meses: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
      valores: [75, 56, 78, 81, 91, 81, 103, 96, 82, 94, 65, 95],
      indices: [90, 67, 94, 97, 110, 97, 124, 116, 99, 113, 78, 114],
    },
  },
  app: {
    total: 609,
    altaConfirmada: 528,
    inconsistentes: 78,
    tmpMedio: 6.4, tmpMediana: 4.0, tmpDp: 6.9, tmpMax: 51,
    tmpPorCid: [
      { grupo: "F20-29 Psicóticos", media: 8.4, mediana: 6.0, n: 225 },
      { grupo: "F30-39 Humor", media: 6.3, mediana: 5.0, n: 112 },
      { grupo: "F10-19 Substâncias", media: 4.7, mediana: 3.0, n: 49 },
      { grupo: "F60-69 Personalidade", media: 2.5, mediana: 2.0, n: 53 },
      { grupo: "F40-49 Neuróticos", media: 2.5, mediana: 2.0, n: 28 },
      { grupo: "F70-79 Retardo", media: 7.2, mediana: 5.0, n: 13 },
      { grupo: "F00-09 Orgânicos", media: 4.8, mediana: 3.0, n: 13 },
    ],
    longaPerm: { n: 82, pct: 15.5 },
    reinternacao: { r7: 8, r15: 13, r30: 28, total: 528, pct7: 1.5, pct15: 2.5, pct30: 5.3 },
    retornoPS: { r7: 775, r15: 1127, r30: 1457, total: 9992, pct7: 7.8, pct15: 11.3, pct30: 14.6 },
  },
  cross: [
    { ano: "2024", total: 457, sim: 254, taxa: 55.6, tempoH: 56.7, pct24h: 33.3 },
    { ano: "2025", total: 636, sim: 225, taxa: 35.4, tempoH: 67.0, pct24h: 21.1 },
    { ano: "2026", total: 186, sim: 42,  taxa: 22.6, tempoH: 73.2, pct24h: 11.3 },
  ],
  siresp: {
    total: 94, vagaObtida: 27, taxa: 28.7, periodo: "Março/2026",
    resolucao: [
      { tipo: "D4 – Possui recurso", n: 27 },
      { tipo: "A1 – Fluxo habitual", n: 26 },
      { tipo: "D5 – Sem atualização", n: 20 },
      { tipo: "A4 – Resolvido local", n: 18 },
      { tipo: "Outros", n: 3 },
    ],
  },
  monitoramento: {
    total: 1694,
    involuntaria: 98.0,
    semHistoricoRas: 46.4,
    baixaAdesao: 34.8,
    vinculoFamiliar: 91.7,
    drogadicao: 25.9,
    procedenciaResidencia: 77.1,
    caps: [
      { nome: "Adulto II Cidade Tiradentes", n: 271, semHistorico: 50.2 },
      { nome: "Adulto III São Matheus", n: 160, semHistorico: 50.0 },
      { nome: "Adulto II Guaianases", n: 158, semHistorico: 50.0 },
      { nome: "AD II Guaianases", n: 137, semHistorico: 47.4 },
      { nome: "Adulto II Itaquera", n: 110, semHistorico: 56.4 },
      { nome: "Adulto II Itaim Paulista", n: 77, semHistorico: 57.1 },
    ],
    ubs: [
      { nome: "Castro Alves", n: 70 },
      { nome: "Prestes Maia", n: 49 },
      { nome: "Inácio Monteiro", n: 45 },
      { nome: "Conquista", n: 40 },
      { nome: "Guaianases", n: 37 },
      { nome: "Nascer do Sol", n: 34 },
      { nome: "Etelvina", n: 30 },
    ],
  },
};

// ─── CONTEÚDO ESTATÍSTICO ─────────────────────────────────────────────────────
const MODULOS = [
  {
    id: "fundamentos", icon: "§", label: "Fundamentos", cor: T.accent,
    topicos: [
      {
        id: "variaveis", titulo: "Tipos de Variáveis",
        subtitulo: "A base de qualquer análise — erre aqui e tudo cai",
        teoria: [
          { t: "intro", txt: "Todo teste estatístico começa com uma única pergunta: qual é a natureza do seu dado? A resposta determina o teste, o gráfico e a interpretação. Errar aqui invalida toda a análise subsequente." },
          { t: "h2", txt: "Variáveis Qualitativas (Categóricas)" },
          { t: "txt", txt: "Representam categorias, não quantidades. Somar ou calcular média não faz sentido." },
          { t: "bullets", items: [
            { b: "Nominais:", txt: " categorias sem ordem — CID, sexo, CAPS de referência, tipo de alta. Você conta (frequência) mas não ordena." },
            { b: "Ordinais:", txt: " categorias com ordem, intervalos desiguais — prioridade de triagem (verde < amarelo < laranja < vermelho), grau de melhora clínica." },
          ]},
          { t: "h2", txt: "Variáveis Quantitativas (Numéricas)" },
          { t: "txt", txt: "Representam quantidades. Operações matemáticas fazem sentido." },
          { t: "bullets", items: [
            { b: "Discretas:", txt: " valores inteiros contáveis — dias de internação, número de fichas CROSS, visitas ao PS." },
            { b: "Contínuas:", txt: " qualquer valor em um intervalo — tempo de permanência em horas, percentuais, valores laboratoriais." },
          ]},
          { t: "caixa", cor: "amber", txt: "IMPACTO PRÁTICO:\nTMP → quantitativa discreta → Mann-Whitney (não t-test)\nTaxa de internação → proporção contínua → qui-quadrado\nPrioridade de triagem → ordinal → nunca calcule a 'média da prioridade'\n\nMisturar tipos produz análises tecnicamente erradas que passam em reuniões sem ninguém perceber." },
        ],
        exemplo: {
          titulo: "Variáveis nos dados de psiquiatria hospitalar",
          items: [
            `"CID principal" → qualitativa NOMINAL: F200, F29, F312 são códigos arbitrários, sem ordem intrínseca`,
            `"Dias de internação" → quantitativa DISCRETA: inteiro não fracionável (não existe 6,5 dias)`,
            `"Prioridade de triagem" → qualitativa ORDINAL: verde < amarelo < laranja < vermelho`,
            `"Taxa de evasão" → quantitativa CONTÍNUA: 6,2% pode ser 6,21%, 6,215%...`,
            `ERRO CLÁSSICO: calcular "média do CID" (F200=1, F29=2...) — sem significado estatístico nem clínico`,
            `ERRO CLÁSSICO: calcular "média da prioridade de triagem" — a escala não é intervalar`,
          ],
        },
        ancora: {
          titulo: "Pergunta-Gatilho para Decidir na Hora",
          txt: `"Faz sentido SOMAR dois desses valores?"\n→ NÃO → Qualitativa\n→ SIM → Quantitativa\n\n"Pode ser fracionado com sentido real?"\n→ NÃO → Discreta (dias, contagens)\n→ SIM → Contínua (horas, percentuais)\n\n"Existe ordem entre as categorias?"\n→ SIM → Ordinal\n→ NÃO → Nominal\n\nMNÊMICO: "Somar? Fracionável? Ordenável?"`,
        },
        quizzes: [
          { q: "Número de fichas CROSS abertas em março/2026 (n=94). Tipo correto:", ops: ["Qualitativa nominal","Quantitativa discreta","Quantitativa contínua","Qualitativa ordinal"], c: 1, exp: "Contagem = quantitativa discreta. Não existe 94,5 fichas. Para comparar entre meses: qui-quadrado de tendência ou Poisson, não t-test." },
          { q: "Taxa CROSS caindo de 55,6% → 35,4% → 22,6%. Tipo da variável:", ops: ["Qualitativa ordinal","Proporção — quantitativa contínua","Quantitativa discreta","Qualitativa nominal"], c: 1, exp: "Taxa é quantitativa contínua. Para testar se a queda é significativa ao longo do tempo: Cochran-Armitage (tendência linear em proporções). Qui-quadrado simples testaria igualdade mas ignoraria a ordem temporal." },
          { q: "Por que calcular 'média do CID' (F200=1, F29=2...) é incorreto?", ops: ["n é pequeno demais","CID é nominal — numeração é código arbitrário, sem escala real","CID é ordinal e precisa de mediana","Porque CIDs têm outliers"], c: 1, exp: "CID é nominal: os números são identificadores, não escala. F200 não é 'mais' que F29. Para variável nominal use moda (mais frequente) e frequência absoluta/relativa." },
          { q: "Prioridade de triagem: verde/amarelo/laranja/vermelho. Teste adequado para comparar dois grupos:", ops: ["Teste t — é numérico","Mann-Whitney — ordinal com ordem clara","Qui-quadrado — é categórico qualquer","Pearson — tem sequência"], c: 1, exp: "Ordinal com ordem clara → Mann-Whitney para 2 grupos, Kruskal-Wallis para 3+. Teste t pressupõe intervalos iguais entre categorias (não é o caso aqui). Qui-quadrado perderia a informação da ordem." },
        ],
      },
      {
        id: "tendencia", titulo: "Tendência Central",
        subtitulo: "Média, mediana, moda — quando cada uma representa a realidade",
        teoria: [
          { t: "intro", txt: "Medidas de tendência central resumem onde os dados se concentram. Escolher a errada distorce a realidade e leva a metas e decisões equivocadas." },
          { t: "h2", txt: "Média Aritmética (x̄)" },
          { t: "formula", txt: "x̄ = Σxᵢ / n\n\nUse quando: distribuição simétrica, sem outliers extremos.\nSensível a outliers — um caso extremo puxa fortemente." },
          { t: "h2", txt: "Mediana (Md)" },
          { t: "formula", txt: "n ímpar: posição (n+1)/2\nn par: média dos dois valores centrais\n\nUse quando: distribuição assimétrica, outliers presentes, dados ordinais.\nRobusta a extremos — o par natural do IQR." },
          { t: "h2", txt: "Moda (Mo)" },
          { t: "txt", txt: "Valor mais frequente. Única medida válida para variáveis nominais. Pode ser múltipla ou inexistente." },
          { t: "caixa", cor: "accent", txt: "HIERARQUIA DE ESCOLHA:\n1. Dados normais/simétricos → Média\n2. Dados assimétricos → Mediana\n3. Dados nominais → Moda\n\nREGRA DE OURO: sempre reporte as três em dados clínicos.\nElas contam histórias diferentes sobre o mesmo fenômeno." },
        ],
        exemplo: {
          titulo: "TMP real — Alta Confirmada (n=528)",
          items: [
            `Média TMP = ${DB.app.tmpMedio} dias | Mediana = ${DB.app.tmpMediana} dias | DP = ${DB.app.tmpDp} dias`,
            `Diferença Média−Mediana = ${(DB.app.tmpMedio - DB.app.tmpMediana).toFixed(1)} dias → assimetria positiva confirmada`,
            `O paciente TÍPICO fica ${DB.app.tmpMediana} dias (mediana). A média de ${DB.app.tmpMedio}d é inflada pelos ${24} casos >20 dias`,
            `Para metas de giro de leito: use MEDIANA — representa a maioria dos casos`,
            `Para cálculo de custo total e orçamento: use MÉDIA — os outliers custam dinheiro real`,
            `Para comunicação ao gestor: "A maioria tem alta em 4 dias, mas casos complexos elevam a média para 6,4 dias"`,
          ],
        },
        ancora: {
          titulo: "Regra dos 3S para Memorizar",
          txt: `Simétrico → média\nAssimétrico → mediana\nSem ordem (nominal) → moda\n\nSINAL RÁPIDO:\nMédia > Mediana → cauda à direita (casos graves inflando)\nMédia < Mediana → cauda à esquerda (raro em psiquiatria)\nMédia = Mediana → distribuição simétrica\n\nDICA DE CAMPO: se alguém citar apenas a média de dados de saúde, sempre pergunte a mediana.`,
        },
        quizzes: [
          { q: `TMP real do app de plantão: média=${DB.app.tmpMedio}d, mediana=${DB.app.tmpMediana}d. Qual representa o paciente típico?`, ops: [`Média (${DB.app.tmpMedio}d) — mais completa`,`Mediana (${DB.app.tmpMediana}d) — robusta aos outliers`,`Moda — mais frequente`,"Nenhuma — n é pequeno"], c: 1, exp: `Mediana=${DB.app.tmpMediana}d. A média de ${DB.app.tmpMedio}d é inflada pelos 24 casos >20 dias. Para comunicar o 'caso típico': mediana. Para orçamento (os casos extremos custam de verdade): média.` },
          { q: "Para comunicar ao secretário de saúde o custo médio por internação, qual medida usar?", ops: ["Mediana — mais robusta","Média — outliers custam dinheiro real e impactam orçamento","Moda — mais frequente","Mediana aparada"], c: 1, exp: "Custo total = média × n. Usando mediana você subestimaria o orçamento — ela exclui o impacto dos casos complexos que de fato ocorreram e custaram. Para o caso típico: mediana. Para orçamento total: média." },
          { q: `TMP média=${DB.app.tmpMedio}d e mediana=${DB.app.tmpMediana}d. Essa diferença indica:`, ops: ["Erro de cálculo","Distribuição bimodal","Assimetria positiva — cauda à direita com longa permanência","Distribuição normal com outliers simétricos"], c: 2, exp: "Sempre que média > mediana → assimetria positiva (cauda à direita). Os casos de 30, 40, 51 dias puxam a média sem mover a mediana. Assinatura clássica de dados de tempo em saúde." },
        ],
      },
      {
        id: "dispersao", titulo: "Medidas de Dispersão",
        subtitulo: "A média sem o DP não diz absolutamente nada",
        teoria: [
          { t: "intro", txt: "Dois serviços podem ter exatamente o mesmo TMP médio com comportamentos completamente opostos. A dispersão conta essa história." },
          { t: "h2", txt: "Variância (s²) e Desvio Padrão (s)" },
          { t: "formula", txt: "s² = Σ(xᵢ - x̄)² / (n-1)    ← denominador n-1: correção de Bessel\ns  = √s²                     ← mesma unidade dos dados\n\nRegra 68-95-99,7 (para normais):\n± 1 DP → 68% dos dados\n± 2 DP → 95% dos dados\n± 3 DP → 99,7% dos dados" },
          { t: "h2", txt: "Coeficiente de Variação (CV)" },
          { t: "formula", txt: "CV = (s / x̄) × 100%\n\n< 15%  → baixa variabilidade\n15–30% → moderada\n> 30%  → alta variabilidade\n> 100% → extrema (DP maior que a média)" },
          { t: "h2", txt: "Amplitude Interquartil (IQR)" },
          { t: "formula", txt: "IQR = Q3 − Q1  (cobre os 50% centrais)\n\nOutlier superior: > Q3 + 1,5 × IQR\nOutlier inferior: < Q1 − 1,5 × IQR" },
          { t: "h2", txt: "Erro Padrão da Média (EPM)" },
          { t: "formula", txt: "EPM = s / √n\n\nMede a PRECISÃO da estimativa da média — não a dispersão dos dados.\nCom n grande: EPM pequeno mesmo com dados muito variáveis." },
          { t: "caixa", cor: "red", txt: "ERRO CRÍTICO — NUNCA CONFUNDIR:\nDP → descreve a VARIABILIDADE dos dados\nEPM → descreve a PRECISÃO da estimativa da média\n\nExemplo: artigo com 'TMP = 7,2 ± 0,4 (EPM), n=300'\nDP real = EPM × √n = 0,4 × √300 ≈ 6,9 dias\nOs dados são variáveis mesmo com EPM pequeno!\n\nUSE DP em tabelas descritivas. USE EPM em inferência." },
        ],
        exemplo: {
          titulo: "CV e Outliers no TMP real",
          items: [
            `TMP: média=${DB.app.tmpMedio}d, DP=${DB.app.tmpDp}d → CV=(${DB.app.tmpDp}/${DB.app.tmpMedio})×100 = ${((DB.app.tmpDp/DB.app.tmpMedio)*100).toFixed(0)}%`,
            `CV>100%: variabilidade EXTREMA — o DP é maior que a média. Confirma: use mediana e IQR`,
            `IQR = Q3−Q1 = 8−2 = 6 dias → 50% dos pacientes ficam entre 2 e 8 dias`,
            `Outlier superior = Q3 + 1,5×IQR = 8 + 1,5×6 = 17 dias`,
            `Toda internação >17 dias é estatisticamente outlier → revisão clínica ativa obrigatória`,
            `${DB.app.longaPerm.n} casos ultrapassaram 11 dias — todos são outliers pelo critério boxplot`,
          ],
        },
        ancora: {
          titulo: "DP vs EPM — Distinção Fundamental",
          txt: `DP grande = dados muito espalhados = heterogeneidade real\nEPM pequeno = estimativa precisa da média (por n grande)\n\nTESTE RÁPIDO: artigo com 'TMP = 7,2 ± 0,4'\n→ Se ±0,4 for EPM e n=300: DP real = 0,4×√300 ≈ 6,9 dias\n→ Os dados são variáveis mesmo com EPM minúsculo\n\nREGRA: tabelas descritivas usam DP. Tabelas de inferência usam IC ou EPM.\n\nMNÊMICO: "DP descreve os dados. EPM descreve a estimativa."`,
        },
        quizzes: [
          { q: `TMP: média=${DB.app.tmpMedio}d, DP=${DB.app.tmpDp}d. CV=? O que indica?`, ops: ["CV=93% — moderada variabilidade","CV=108% — extrema, média não representa bem","CV=46% — baixa variabilidade","CV=108% — distribuição normal"], c: 1, exp: `CV=(${DB.app.tmpDp}/${DB.app.tmpMedio})×100=107,8%≈108%. CV>100%: DP maior que a média. Confirma automaticamente: use mediana, IQR e testes não-paramétricos.` },
          { q: "Hospital A: média=8d, DP=2d. Hospital B: média=8d, DP=9d. O que a diferença indica?", ops: ["São idênticos — mesma média","Hospital B tem cases mais complexos ou alta menos padronizada","Hospital A tem pacientes mais graves","Não é possível comparar"], c: 1, exp: "Mesma média, DP completamente diferente. Hospital B: heterogeneidade extrema — alguns saem rápido, outros ficam muito. Pode indicar: critérios de alta inconsistentes, gargalos regulatórios intermitentes, mix de CIDs muito variado." },
          { q: "IQR do TMP = 6 dias (Q1=2, Q3=8). Limite superior para outlier (boxplot):", ops: ["17 dias","14 dias","20 dias","11 dias"], c: 0, exp: "Outlier superior = Q3+1,5×IQR = 8+1,5×6 = 8+9 = 17 dias. Internações >17d são estatisticamente outliers e merecem revisão clínica individualizada." },
          { q: "Artigo: 'TMP = 7,2 ± 0,4 (EPM), n=300'. Qual é o DP aproximado dos dados?", ops: ["0,4 dias — o EPM é o DP","6,9 dias — EPM × √n","7,2 dias","Impossível calcular"], c: 1, exp: "DP = EPM × √n = 0,4 × √300 = 0,4 × 17,3 ≈ 6,9 dias. EPM pequeno não significa dados pouco variáveis — significa que a estimativa da média é precisa por n grande. Os dados ainda têm alta variabilidade (DP=6,9)." },
        ],
      },
    ],
  },
  {
    id: "distribuicoes", icon: "∿", label: "Distribuições", cor: T.violet,
    topicos: [
      {
        id: "normal", titulo: "Distribuição Normal",
        subtitulo: "O sino que governa a estatística paramétrica — e porque falha em saúde",
        teoria: [
          { t: "intro", txt: "A distribuição normal (gaussiana) é o alicerce da estatística paramétrica. Descrita por dois parâmetros: μ (média) e σ (DP). Simétrica — média = mediana = moda." },
          { t: "h2", txt: "Regra 68-95-99,7" },
          { t: "formula", txt: "μ ± 1σ → 68,27% dos dados\nμ ± 2σ → 95,45% dos dados\nμ ± 3σ → 99,73% dos dados" },
          { t: "h2", txt: "Escore Z — Padronização" },
          { t: "formula", txt: "Z = (x − μ) / σ\n\nTransforma qualquer normal em N(0,1) — média 0, DP 1.\nZ=2: valor está 2 DP acima da média em qualquer escala.\np(Z>1,96) = 2,5% → base do IC95%" },
          { t: "h2", txt: "Como Testar Normalidade" },
          { t: "bullets", items: [
            { b: "Shapiro-Wilk:", txt: " preferível para n < 50. Mais sensível e específico." },
            { b: "Kolmogorov-Smirnov:", txt: " para n > 50. Mais conservador." },
            { b: "Anderson-Darling:", txt: " bom para n intermediário." },
            { b: "Visual:", txt: " histograma + QQ-plot (pontos alinhados = normal)." },
          ]},
          { t: "txt", txt: "p > 0,05 → não rejeita normalidade. Não prova normalidade — apenas não a contradiz." },
          { t: "caixa", cor: "violet", txt: "POR QUE TMP RARAMENTE É NORMAL:\nDados de tempo têm limite inferior em 0 (dias negativos não existem).\nCauda longa à direita por casos complexos.\nResultado: assimetria positiva sistêmica.\n\nConsequência: Shapiro-Wilk provavelmente p<0,001 para TMP.\nDecisão automática: Mann-Whitney em vez de t-test.\n\n'Para dados de saúde, suspeite do normal — ele é exceção, não regra.'" },
        ],
        exemplo: {
          titulo: "Escore Z e Normalidade no TMP real",
          items: [
            `TMP=20d com média=${DB.app.tmpMedio}, DP=${DB.app.tmpDp}: Z=(20−${DB.app.tmpMedio})/${DB.app.tmpDp} = ${((20-DB.app.tmpMedio)/DB.app.tmpDp).toFixed(2)}`,
            `Z≈1,97: paciente está quase 2 DP acima da média → top ~2,5% se fosse normal`,
            `TMP máximo = ${DB.app.tmpMax}d: Z=(${DB.app.tmpMax}−${DB.app.tmpMedio})/${DB.app.tmpDp} = ${((DB.app.tmpMax-DB.app.tmpMedio)/DB.app.tmpDp).toFixed(1)} → caso extremo`,
            `Shapiro-Wilk no TMP: provavelmente p<0,001 (assimetria severa, CV=108%)`,
            `Decisão: use Mann-Whitney (não t-test), Kruskal-Wallis (não ANOVA), Spearman (não Pearson)`,
            `Usar testes paramétricos em TMP = inflar taxa de falsos positivos nas análises`,
          ],
        },
        ancora: {
          titulo: "Normal é a Exceção em Saúde",
          txt: `TMP, custo, tempo de espera, valores laboratoriais → quase sempre assimétricos.\n\nPROCEDIMENTO PADRÃO:\n1. Sempre teste normalidade primeiro (Shapiro-Wilk se n<50, K-S se n>50)\n2. Se p<0,05: use não-paramétrico\n3. Se duvidar: use não-paramétrico — nunca é errado,\n   apenas levemente menos poderoso quando normalidade é atendida\n\nMNÊMICO: "Suspeite do Normal. Confirme com Shapiro."`,
        },
        quizzes: [
          { q: `TMP: média=${DB.app.tmpMedio}d, mediana=${DB.app.tmpMediana}d. Sem calcular, qual é a assimetria?`, ops: ["Negativa — cauda à esquerda","Positiva — cauda à direita","Simétrica","Bimodal"], c: 1, exp: "Média > Mediana → assimetria positiva (cauda à direita). Casos extremos (30, 51 dias) puxam a média sem mover a mediana. Assinatura clássica de dados de tempo em saúde." },
          { q: `Z de um paciente com TMP=20d (média=${DB.app.tmpMedio}, DP=${DB.app.tmpDp}):`, ops: ["Z=1,97","Z=2,87","Z=1,45","Z=3,14"], c: 0, exp: `Z=(20−${DB.app.tmpMedio})/${DB.app.tmpDp}=${((20-DB.app.tmpMedio)/DB.app.tmpDp).toFixed(2)}. Quase 2 DP acima da média → top ~2,5% se fosse normal. Como a distribuição é assimétrica, o percentil real difere, mas Z ainda identifica o caso como extremo.` },
          { q: "Você aplica teste t para comparar TMP entre psicóticos e bipolares sem testar normalidade (n=20 por grupo). O risco principal:", ops: ["Nenhum — t é robusto para qualquer n","Inflar erro tipo I — falsos positivos","Reduzir o poder do teste","Aumentar o n necessário"], c: 1, exp: "Com n pequeno e assimetria severa, violar normalidade infla o erro tipo I. Com n>30, o Teorema do Limite Central atenua o problema. Com n=20 por grupo, o risco é real — use Mann-Whitney." },
        ],
      },
      {
        id: "assimetria", titulo: "Assimetria & Curtose",
        subtitulo: "A forma da distribuição além de média e DP",
        teoria: [
          { t: "intro", txt: "Assimetria e curtose descrevem a forma da distribuição. Dois datasets com mesma média e DP podem ter formas completamente diferentes — e exigir análises distintas." },
          { t: "h2", txt: "Assimetria (Skewness)" },
          { t: "formula", txt: "Pearson (simplificado): A ≈ 3(Média − Mediana) / DP\n\n|A| < 0,5  → aproximadamente simétrica → testes paramétricos OK\n0,5–1,0    → assimetria moderada → prefira mediana e não-paramétrico\n> 1,0      → assimetria severa   → obrigatório: mediana, IQR, não-paramétrico\n\nPositiva (>0): cauda à direita — média > mediana\nNegativa (<0): cauda à esquerda — média < mediana" },
          { t: "h2", txt: "Curtose (Kurtosis)" },
          { t: "bullets", items: [
            { b: "= 3 (excesso=0):", txt: " mesocúrtica = normal" },
            { b: "> 3 (excesso>0):", txt: " leptocúrtica — pico alto, caudas pesadas, muitos outliers" },
            { b: "< 3 (excesso<0):", txt: " platicúrtica — achatada, sem pico definido" },
          ]},
          { t: "caixa", cor: "violet", txt: "EM PSIQUIATRIA HOSPITALAR:\nTMP tipicamente leptocúrtico: muitos casos breves (2-5d) + alguns extremamente longos (30-51d) = caudas pesadas.\nCusto por internação: assimetria positiva + leptocúrtico = surpresas caras.\n\nIMPLICAÇÃO: IQR é mais informativo que DP nesses dados. Boxplot é mais informativo que histograma." },
        ],
        exemplo: {
          titulo: "Assimetria Real calculada",
          items: [
            `Assimetria de Pearson = 3×(${DB.app.tmpMedio}−${DB.app.tmpMediana})/${DB.app.tmpDp} = 3×${(DB.app.tmpMedio-DB.app.tmpMediana).toFixed(1)}/${DB.app.tmpDp} = ${(3*(DB.app.tmpMedio-DB.app.tmpMediana)/DB.app.tmpDp).toFixed(2)}`,
            `Assimetria = ${(3*(DB.app.tmpMedio-DB.app.tmpMediana)/DB.app.tmpDp).toFixed(2)} > 1,0 → SEVERA → decisão automática`,
            `Mediana como central, IQR como dispersão, Mann-Whitney/Kruskal-Wallis para comparações`,
            `Curtose: provavelmente leptocúrtica — pico em 2-4 dias + cauda pesada até 51 dias`,
            `Implicação operacional: planejar capacidade só com média subestima risco de lotação`,
          ],
        },
        ancora: {
          titulo: "A Cauda Aponta para Onde a Média Foi Arrastada",
          txt: `Assimetria positiva → cauda direita → média > mediana\nAssimetria negativa → cauda esquerda → média < mediana\n\nLEPTOCÚRTICA = caudas gordas = mais surpresas extremas\nPLATICÚRTICA = achatada = comportamento mais previsível\n\nMNÊMICO:\n"Lepto = gordo nas caudas (como um leopardo pesado)"\n"Plati = achatado como um prato"\n\nDECISÃO RÁPIDA:\n|Assimetria| > 1 → sempre não-paramétrico, sem exceção`,
        },
        quizzes: [
          { q: `Assimetria = 3×(${DB.app.tmpMedio}−${DB.app.tmpMediana})/${DB.app.tmpDp} = ${(3*(DB.app.tmpMedio-DB.app.tmpMediana)/DB.app.tmpDp).toFixed(2)}. Decisão imediata:`, ops: ["Usar média e t-test — assimetria leve","Severa (>1): mediana, IQR, Mann-Whitney","Distribuição simétrica — qualquer teste serve","Calcular curtose antes de decidir"], c: 1, exp: `Assimetria>${1.0}: severa. Decisão automática e irrevogável: mediana como central, IQR como dispersão, Mann-Whitney/Kruskal-Wallis para comparações, Spearman para correlação.` },
          { q: "Custo por internação em psiquiatria tipicamente tem:", ops: ["Assimetria negativa e platicúrtica","Assimetria positiva e leptocúrtica","Normal e mesocúrtica","Assimetria zero e leptocúrtica"], c: 1, exp: "Custo em saúde: assimetria positiva (casos complexos custam muito mais) + leptocúrtica (muitos baratos + alguns caríssimos = caudas pesadas). Relatório com apenas média de custo sempre subestima o impacto fiscal real." },
        ],
      },
    ],
  },
  {
    id: "inferencia", icon: "⊢", label: "Inferência", cor: T.green,
    topicos: [
      {
        id: "hipoteses", titulo: "Teste de Hipóteses",
        subtitulo: "H₀, H₁, p-valor, erros tipo I e II — a lógica da decisão estatística",
        teoria: [
          { t: "intro", txt: "O teste de hipóteses é o motor da inferência. Permite decidir, com base em amostra, se um efeito observado é real ou produto do acaso. É a ferramenta mais usada — e mais mal interpretada — em pesquisa clínica." },
          { t: "h2", txt: "As Duas Hipóteses" },
          { t: "bullets", items: [
            { b: "H₀ (nula):", txt: " 'não há efeito'. Hipótese conservadora — assumimos verdadeira até prova em contrário." },
            { b: "H₁ (alternativa):", txt: " 'há efeito'. O que você quer demonstrar." },
          ]},
          { t: "h2", txt: "O p-valor — O Mais Mal Interpretado da Estatística" },
          { t: "caixa", cor: "red", txt: "DEFINIÇÃO CORRETA:\np-valor = probabilidade de obter resultado tão extremo quanto o observado, ASSUMINDO que H₀ é verdadeira.\n\np-valor NÃO É:\n× A probabilidade de H₀ ser verdadeira\n× A probabilidade do resultado se repetir\n× Uma medida de tamanho do efeito\n× Prova de nada\n\np<0,05 significa apenas: 'Se não houvesse diferença, observaríamos isso por acaso em <5% das amostras'." },
          { t: "h2", txt: "Os Dois Erros — Tabela de Decisão" },
          { t: "formula", txt: "                  H₀ verdadeira    H₀ falsa\nRejeitar H₀    → ERRO TIPO I (α)  Decisão correta\nNão rejeitar   → Decisão correta  ERRO TIPO II (β)\n\nErro Tipo I (α=0,05): falso positivo → alarme falso\nErro Tipo II (β):     falso negativo → miss clínico\nPoder = 1−β. Convenção: ≥ 0,80 (80%)" },
          { t: "caixa", cor: "amber", txt: "SIGNIFICÂNCIA ≠ RELEVÂNCIA CLÍNICA:\nCom n=10.000, TMP 8,0d vs 8,1d pode ter p=0,001.\nEstatisticamente significativo — clinicamente irrelevante.\n\nSEMPRE reporte tamanho do efeito (d de Cohen, OR, η²)\njunto ao p-valor. p-valor sozinho não informa magnitude." },
        ],
        exemplo: {
          titulo: "Taxa de Internação por Médico — Interpretação Correta",
          items: [
            `Médico A (Glauce)=24,7% (n=219) vs Médico B (Nuno)=16,3% (n=1205). p<0,001`,
            `Diferença de 8,4pp: estatisticamente significativa. Clinicamente relevante? Possivelmente.`,
            `Mas: é atribuível ao médico? Precisa ajustar por horário do plantão e CID dos pacientes`,
            `p-valor não ajusta confundidores — regressão logística faz isso`,
            `ERRO CLÁSSICO: 'Médico A interna mais porque é menos criterioso' sem análise multivariada`,
            `Correto: 'Há diferença significativa que requer investigação do case-mix por médico'`,
          ],
        },
        ancora: {
          titulo: "Erro I = Alarme Falso | Erro II = Miss Clínico",
          txt: `Erro Tipo I = você grita 'lobo!' sem lobo (α protege contra isso)\nErro Tipo II = o lobo estava lá e você não viu (poder protege contra isso)\n\nPRIORIDADE POR CONTEXTO:\nTriagem diagnóstica → minimize Tipo II (alta sensibilidade, não perca casos)\nDecisões de internação → minimize Tipo I (não interne quem não precisa)\nAlerta de longa permanência → minimize Tipo II (prefira alarme falso a miss)\n\nMNÊMICO: 'p pequeno = evidência CONTRA H₀, não PROVA de H₁'`,
        },
        quizzes: [
          { q: `Reinternação 30d: psicóticos=${DB.app.reinternacao.pct30}% vs bipolares=3,1%, p=0,08. Conclusão correta:`, ops: ["Há diferença significativa","Não há diferença real entre os grupos","Sem evidência suficiente com α=0,05 — possível erro tipo II com n pequeno","p=0,08 ≈ 0,05"], c: 2, exp: `p=0,08>0,05 → não rejeita H₀. MAS: n pequeno de reinternações → poder baixo → possível erro tipo II. Diferença de ~2,2pp pode ser clinicamente relevante mesmo sem significância. Solução: calcular o poder e reportar IC95%.` },
          { q: "n=10.000, TMP: 8,0d vs 8,1d, p=0,001. O que concluir?", ops: ["Diferença clinicamente importante","Significativo mas irrelevante — 2,4h de diferença não justifica intervenção","Erro tipo I ocorreu","Teste mal aplicado"], c: 1, exp: "n enorme detecta diferenças minúsculas. p=0,001 confirma que 0,1 dia dificilmente é acaso — mas 2,4 horas de diferença no TMP é clinicamente irrelevante. Sempre reporte tamanho do efeito junto ao p-valor." },
          { q: "Mudando α de 0,05 para 0,01. Efeito nos erros:", ops: ["Reduz Tipo I e aumenta Tipo II","Reduz ambos","Aumenta Tipo I e reduz Tipo II","Não afeta os erros"], c: 0, exp: "Critério mais rigoroso (α=0,01): menos falsos positivos (Tipo I diminui). O preço: precisa de evidência mais forte para rejeitar H₀ → mais chance de não detectar efeitos reais → Tipo II aumenta. Trade-off inevitável." },
          { q: `Taxa CROSS: ${DB.cross[0].taxa}% → ${DB.cross[1].taxa}% → ${DB.cross[2].taxa}%. Teste para avaliar se a queda é significativa:`, ops: ["Qui-quadrado simples","Cochran-Armitage (tendência linear em proporções)","Mann-Whitney","Shapiro-Wilk"], c: 1, exp: "Variável ordinal (anos em sequência) + proporção → Cochran-Armitage testa especificamente tendência linear. Qui-quadrado simples testaria apenas igualdade, ignorando a ordem temporal. É a diferença entre 'as proporções são iguais?' e 'há tendência de queda ao longo do tempo?'." },
        ],
      },
      {
        id: "ic", titulo: "Intervalo de Confiança",
        subtitulo: "O IC95% diz quanto. O p-valor diz se. Prefira o IC.",
        teoria: [
          { t: "intro", txt: "O Intervalo de Confiança é, na prática, mais informativo que o p-valor. Enquanto o p-valor responde 'sim ou não', o IC responde 'quanto e com que precisão'." },
          { t: "h2", txt: "Definição Correta — Não a Intuitiva" },
          { t: "caixa", cor: "green", txt: "IC 95% = intervalo calculado por um procedimento que, se repetido infinitas vezes com amostras da mesma população, capturaria o verdadeiro parâmetro em 95% das vezes.\n\nNÃO É: '95% de probabilidade de que o valor verdadeiro está aqui'.\nO valor verdadeiro é fixo. O que varia é o intervalo.\n\nNa prática: 'Se eu fizesse esse estudo 100 vezes, em 95 delas o IC construído incluiria o valor real'." },
          { t: "h2", txt: "Fórmulas" },
          { t: "formula", txt: "Para média: IC = x̄ ± Z_α/2 × (s/√n)\nIC95%: Z = 1,96 | IC99%: Z = 2,576\n\nPara proporções: IC = p ± 1,96 × √(p×(1−p)/n)\nPara p<0,10 ou p>0,90: use método de Wilson" },
          { t: "h2", txt: "Interpretação Prática" },
          { t: "bullets", items: [
            { b: "IC estreito:", txt: " estimativa precisa (n grande ou baixa variabilidade)" },
            { b: "IC amplo:", txt: " imprecisão (n pequeno ou alta variabilidade)" },
            { b: "IC não cruza 0 (diferenças) ou 1 (OR/RR):", txt: " significativo com α correspondente" },
            { b: "IC cruza o valor nulo:", txt: " não significativo" },
          ]},
        ],
        exemplo: {
          titulo: `IC para Taxa CROSS 2026 (${DB.cross[2].sim}/${DB.cross[2].total})`,
          items: [
            `Taxa = ${DB.cross[2].sim}/${DB.cross[2].total} = ${DB.cross[2].taxa}%`,
            `IC95% = ${DB.cross[2].taxa}% ± 1,96×√(0,226×0,774/${DB.cross[2].total}) = ${DB.cross[2].taxa}% ± 6,0%`,
            `IC95% = [16,6% ; 28,6%]`,
            `Interpretação: com 95% de confiança, a taxa real estava entre 16,6% e 28,6% em março/2026`,
            `Mesmo o limite superior (28,6%) está muito abaixo dos ${DB.cross[0].taxa}% de 2024`,
            `A queda é real, estatisticamente robusta e clinicamente grave — o IC confirma`,
          ],
        },
        ancora: {
          titulo: "IC Diz Quanto. p-valor Diz Se.",
          txt: `Dois estudos com p=0,04 podem ter IC [0,01;0,02] ou IC [0,01;10,0].\nO primeiro: efeito pequeno e preciso. O segundo: imprecisão extrema.\n\nOR=3,8 IC[2,1;6,9] → significativo e suficientemente preciso\nOR=3,8 IC[0,9;16,2] → não significativo (cruza 1) e muito impreciso\n\nSEMPRE prefira reportar IC ao p-valor isolado.\nEm apresentações institucionais: IC é mais comunicativo que p-valor.\n\nMNÊMICO: "IC diz QUANTO e COM QUE PRECISÃO. p-valor diz SE."`,
        },
        quizzes: [
          { q: "OR=3,8 (IC95% 2,1–6,9) para psicótico e longa permanência. Interpretação:", ops: ["Não significativo — IC amplo","3,8x mais chance; IC não cruza 1 → significativo e robusto","IC cruza 1 → não significativo","OR=3,8 = 38% mais risco"], c: 1, exp: "IC [2,1;6,9] não inclui 1 (valor nulo do OR) → significativo. OR=3,8 significa 3,8 VEZES mais chance (não 3,8%). IC amplo mas inteiramente >1: efeito real e substancial." },
          { q: "Estudo A: OR=2,1 IC[1,9;2,3]. Estudo B: OR=3,5 IC[1,1;11,2]. Qual é mais confiável?", ops: ["Estudo B — OR maior","Estudo A — IC estreito, estimativa precisa","São equivalentes","Estudo B — IC amplo indica mais variabilidade real"], c: 1, exp: "Estudo A: IC [1,9;2,3] estreito → precisão, n grande. Estudo B: IC [1,1;11,2] enorme → imprecisão extrema, n pequeno. O OR 3,5 poderia ser 1,1 (quase nulo) ou 11,2 (imenso). Estudo A é muito mais confiável apesar do OR menor." },
        ],
      },
    ],
  },
  {
    id: "testes", icon: "⚖", label: "Testes", cor: T.amber,
    topicos: [
      {
        id: "qui2", titulo: "Qui-Quadrado & Fisher",
        subtitulo: "Comparando proporções e associações entre categorias",
        teoria: [
          { t: "intro", txt: "O qui-quadrado (χ²) testa associação entre duas variáveis categóricas, ou se uma distribuição observada difere da esperada. É o teste mais usado em pesquisa clínica." },
          { t: "h2", txt: "Fórmula e Graus de Liberdade" },
          { t: "formula", txt: "χ² = Σ (Observado − Esperado)² / Esperado\n\nGL = (linhas−1) × (colunas−1)\nTabela 2×2: GL = 1\nTabela 3×2: GL = 2" },
          { t: "h2", txt: "Pressupostos — TODOS Devem ser Atendidos" },
          { t: "bullets", items: [
            { b: "Frequências esperadas ≥ 5:", txt: " em pelo menos 80% das células" },
            { b: "Frequências esperadas ≥ 1:", txt: " em TODAS as células" },
            { b: "Observações independentes:", txt: " cada paciente conta uma vez" },
          ]},
          { t: "h2", txt: "Quando os Pressupostos Falham" },
          { t: "bullets", items: [
            { b: "Fisher exato:", txt: " tabelas 2×2 com n pequeno ou células esperadas <5" },
            { b: "Monte Carlo:", txt: " tabelas maiores com células pequenas" },
            { b: "Consolidar categorias:", txt: " juntar CIDs raros antes do teste" },
          ]},
          { t: "h2", txt: "Tamanho do Efeito — Cramér's V" },
          { t: "formula", txt: "V = √(χ² / n×min(r−1, c−1))\n\n< 0,10 → negligenciável\n0,10–0,29 → fraco\n0,30–0,49 → moderado\n≥ 0,50 → forte\n\nSEMPRE reporte V junto ao p-valor." },
          { t: "caixa", cor: "amber", txt: "ARMADILHA COM n GRANDE:\nCom n=10.000+, qui-quadrado detecta qualquer microdiferença com p<0,001.\np<0,001 com V=0,04 = associação estatisticamente real mas praticamente irrelevante.\n\nExemplo nos dados PS: evasão Verde=7,4% vs Amarelo=5,1% com n~10.000 → p<0,001, mas V~0,03 = negligenciável." },
        ],
        exemplo: {
          titulo: "Qui-Quadrado nos dados reais",
          items: [
            `Evasão Verde=${7.4}% (n=${DB.ps.prioridades.Verde}) vs Amarelo=${5.1}% (n=${DB.ps.prioridades.Amarelo})`,
            `Qui-quadrado: com n total ~${DB.ps.prioridades.Verde+DB.ps.prioridades.Amarelo}, diferença de 2,3pp provavelmente terá p<0,001`,
            `Cramér's V esperado: ~0,03 → negligenciável — estatisticamente real, clinicamente pouco útil`,
            `Reinternação: psicóticos ${DB.app.reinternacao.pct30}% vs não-psicóticos ~3% — tabela 2×2 → chi² ou Fisher`,
            `Tipo de alta por sexo: tabela 3×2, GL=(3-1)×(2-1)=2 → qui-quadrado`,
            `CAPS como procedência vs tipo de alta: tabela de contingência → qui-quadrado + Cramér's V`,
          ],
        },
        ancora: {
          titulo: "Qui-Quadrado para Categorias — Fluxo de Decisão",
          txt: `Duas variáveis categóricas → qui-quadrado de independência\nCélulas esperadas <5 → Fisher exato (2×2) ou Monte Carlo\nRespostado positivo → reportar Cramér's V\n\nFLUXO MENTAL:\n"Categorias?" → Sim\n"n suficiente em cada célula?" → Sim → χ²; Não → Fisher\n"p<0,05?" → Reportar V para saber se é relevante\n\nMNÊMICO:\n"Qui-quadrado para categorias. Fisher quando o n é raso."`,
        },
        quizzes: [
          { q: "Comparar tipo de alta (melhorado/transferência/evasão) entre homens e mulheres. Teste correto:", ops: ["Teste t","Qui-quadrado (tabela 3×2)","Mann-Whitney","ANOVA"], c: 1, exp: "Duas variáveis categóricas: tipo alta (3 cats) × sexo (2 cats) = tabela 3×2 → qui-quadrado de independência. GL=(3-1)×(2-1)=2. Se alguma célula esperada <5: Monte Carlo ou consolidar categorias." },
          { q: "χ²=42,3, n=10.000, p<0,001, Cramér's V=0,04. Interpretação:", ops: ["Associação forte e significativa","Significativo mas associação negligenciável (V<0,10)","Não significativo","Erro tipo II provável"], c: 1, exp: "p<0,001 → significativo. V=0,04 → negligenciável (<0,10). Com n=10.000, o teste detecta qualquer microdiferença. A variável explica <0,2% da variação. Clinicamente irrelevante apesar do p extremo." },
          { q: "Células esperadas: 3 de 6 células têm valor <5 (50% do total). Teste adequado:", ops: ["Qui-quadrado normal","Fisher exato (se 2×2) ou Monte Carlo","Mann-Whitney","ANOVA"], c: 1, exp: "50% das células com esperado <5 viola o pressuposto (máximo 20% permitido). Use Fisher para 2×2, qui-quadrado com simulação Monte Carlo para tabelas maiores, ou consolide categorias com poucos casos." },
        ],
      },
      {
        id: "mannwhitney", titulo: "Mann-Whitney & Kruskal-Wallis",
        subtitulo: "Testes não-paramétricos para quando a normalidade falha",
        teoria: [
          { t: "intro", txt: "Quando dados não seguem distribuição normal, os testes não-paramétricos são a escolha correta. Trabalham com postos (ranks) ao invés dos valores brutos — robustos a outliers e distribuições assimétricas." },
          { t: "h2", txt: "Mann-Whitney U (= Wilcoxon rank-sum)" },
          { t: "formula", txt: "Compara dois grupos INDEPENDENTES em variável ordinal ou quantitativa não-normal.\nH₀: as distribuições dos dois grupos são idênticas\n\nPassos:\n1. Combinar todos os dados\n2. Ordenar do menor ao maior, atribuir postos\n3. Somar postos de cada grupo\n4. Calcular U e verificar p\n\nTamanho do efeito: r = Z/√N\n0,1=pequeno | 0,3=médio | 0,5=grande" },
          { t: "h2", txt: "Kruskal-Wallis" },
          { t: "formula", txt: "Extensão para 3+ grupos (análogo não-paramétrico da ANOVA).\nSe p<α → post-hoc: Mann-Whitney par a par + Bonferroni\n\nBonferroni: α ajustado = α / número de comparações\n3 grupos = 3 pares → α = 0,05/3 = 0,017\n5 grupos = 10 pares → α = 0,05/10 = 0,005" },
          { t: "h2", txt: "Wilcoxon Signed-Rank" },
          { t: "txt", txt: "Para amostras PAREADAS não-normais (mesmo paciente antes e depois de intervenção). Diferente de Mann-Whitney (amostras independentes)." },
          { t: "caixa", cor: "amber", txt: "QUANDO USAR NÃO-PARAMÉTRICO:\n• Normalidade rejeitada (Shapiro-Wilk p<0,05)\n• n < 30 sem poder verificar normalidade\n• Variável ordinal (escala de agitação, prioridade)\n• Outliers extremos não removíveis\n\nQUANDO DUVIDAR: use não-paramétrico.\nNunca é errado — apenas levemente menos poderoso quando normalidade é atendida." },
        ],
        exemplo: {
          titulo: "TMP por Grupo CID — Kruskal-Wallis",
          items: [
            `${DB.app.tmpPorCid.length} grupos CID, TMP não-normal (assimetria=1,04) → Kruskal-Wallis`,
            `Psicóticos: média=${DB.app.tmpPorCid[0].media}d, mediana=${DB.app.tmpPorCid[0].mediana}d (n=${DB.app.tmpPorCid[0].n})`,
            `Neuróticos: média=${DB.app.tmpPorCid[4].media}d, mediana=${DB.app.tmpPorCid[4].mediana}d (n=${DB.app.tmpPorCid[4].n})`,
            `Resultado esperado: p<0,001 (diferença grande entre grupos)`,
            `Post-hoc: Mann-Whitney par a par, 10 comparações → α ajustado = 0,005`,
            `Escala de agitação antes/depois de protocolo (mesmo paciente) → Wilcoxon signed-rank`,
          ],
        },
        ancora: {
          titulo: "Três Testes, Três Situações — Nunca Confundir",
          txt: `Mann-Whitney = t não-paramétrico (2 grupos INDEPENDENTES)\nKruskal-Wallis = ANOVA não-paramétrica (3+ grupos INDEPENDENTES)\nWilcoxon signed-rank = t pareado não-paramétrico (ANTES/DEPOIS)\n\nMNÊMICO: "Independent? Mann. Many? Kruskal. Matched? Wilcoxon."\n\nApós Kruskal-Wallis significativo: SEMPRE post-hoc com Bonferroni.\nCalcule α ajustado: 0,05 ÷ número de pares.`,
        },
        quizzes: [
          { q: `Comparar TMP (não-normal) entre psicóticos (n=${DB.app.tmpPorCid[0].n}) e bipolares (n=${DB.app.tmpPorCid[1].n}). Teste correto:`, ops: ["Teste t independente","Mann-Whitney U","Qui-quadrado","Kruskal-Wallis"], c: 1, exp: "Dois grupos independentes, variável quantitativa não-normal → Mann-Whitney U. Kruskal-Wallis seria para 3+ grupos. Teste t violaria suposição de normalidade. Qui-quadrado é para variáveis categóricas." },
          { q: "Kruskal-Wallis com 5 grupos CID, p=0,001. Próximo passo:", ops: ["Concluir que todos os grupos diferem","Mann-Whitney par a par com Bonferroni (α=0,005)","Kruskal-Wallis já identifica quais grupos diferem","Repetir com ANOVA"], c: 1, exp: "Kruskal-Wallis diz apenas 'pelo menos um grupo difere'. Post-hoc: Mann-Whitney par a par. 5 grupos = 10 comparações. Bonferroni: α=0,05/10=0,005. Cada par só é significativo se p<0,005." },
          { q: "Agitação (escala 1-5) antes e depois de protocolo — MESMO paciente. Teste correto:", ops: ["Teste t pareado","Mann-Whitney U","Wilcoxon signed-rank","Qui-quadrado"], c: 2, exp: "Amostras PAREADAS (mesmo paciente) + escala ordinal → Wilcoxon signed-rank. Se grupos diferentes (não mesmo paciente): Mann-Whitney. Se fosse normal e pareada: t pareado." },
        ],
      },
      {
        id: "anova", titulo: "ANOVA & Post-hoc",
        subtitulo: "Comparar 3+ grupos sem inflar o erro tipo I",
        teoria: [
          { t: "intro", txt: "Com 3+ grupos, múltiplos testes t inflariam o erro tipo I. Com 3 grupos e α=0,05: chance de ao menos 1 falso positivo = 1−0,95³ = 14,3%. A ANOVA resolve isso com um único teste global." },
          { t: "h2", txt: "ANOVA de Um Fator (one-way)" },
          { t: "formula", txt: "H₀: todas as médias são iguais (μ₁=μ₂=...=μₖ)\nH₁: pelo menos uma média difere\n\nF = Variância ENTRE grupos / Variância DENTRO dos grupos\n\nF > 1: variação entre grupos > variação dentro\nF grande + p<0,05 → rejeita H₀ → ao menos um grupo difere" },
          { t: "h2", txt: "Pressupostos da ANOVA" },
          { t: "bullets", items: [
            { b: "Normalidade:", txt: " cada grupo aproximadamente normal (Shapiro-Wilk por grupo)" },
            { b: "Homocedasticidade:", txt: " variâncias iguais entre grupos (teste de Levene)" },
            { b: "Independência:", txt: " observações independentes entre grupos" },
          ]},
          { t: "h2", txt: "Post-hoc após ANOVA Significativa" },
          { t: "bullets", items: [
            { b: "Tukey HSD:", txt: " variâncias iguais, grupos similares — mais usado" },
            { b: "Games-Howell:", txt: " variâncias desiguais (prefira quando Levene p<0,05)" },
            { b: "Bonferroni:", txt: " conservador, funciona sempre" },
            { b: "Scheffé:", txt: " mais conservador — comparações planejadas" },
          ]},
          { t: "h2", txt: "Tamanho do Efeito — η² (eta-quadrado)" },
          { t: "formula", txt: "η² = SS_entre / SS_total\n\n0,01 → pequeno\n0,06 → médio\n0,14 → grande" },
          { t: "caixa", cor: "amber", txt: "ANOVA vs KRUSKAL-WALLIS:\nPressupostos atendidos + n>30 por grupo → ANOVA\nNormalidade violada OU n pequeno → Kruskal-Wallis\nVariâncias muito desiguais com n diferentes → Welch's ANOVA\n\nNUNCA: múltiplos t-tests sem correção para 3+ grupos.\nChance de falso positivo: 3 grupos=14%, 5 grupos=40%, 10 grupos=65%!" },
        ],
        exemplo: {
          titulo: "TMP por CID — ANOVA vs Kruskal-Wallis",
          items: [
            `${DB.app.tmpPorCid.length} grupos CID, TMP com assimetria severa (1,04) → Shapiro-Wilk provavelmente p<0,001`,
            `ANOVA: pressuposto de normalidade violado → NÃO usar`,
            `Kruskal-Wallis: correto. Resultado esperado: p<0,001`,
            `Post-hoc: Mann-Whitney par a par (10 comparações) com Bonferroni → α=0,005`,
            `Se tivesse normalidade: ANOVA one-way → F → post-hoc Tukey`,
            `ANOVA two-way hipotética: TMP ~ CID + Médico + CID×Médico (3 efeitos testados)`,
          ],
        },
        ancora: {
          titulo: "ANOVA: F = Between/Within — Grande F = Grupos Diferentes",
          txt: `3+ grupos com normal → ANOVA + Tukey (ou Games-Howell se variâncias desiguais)\n3+ grupos sem normal → Kruskal-Wallis + Mann-Whitney + Bonferroni\n\nF grande = variação ENTRE grupos > variação DENTRO dos grupos\nη² = "quanto os grupos explicam da variância total"\n\nNUNCA múltiplos t-tests!\n3 grupos: 14% de falso positivo. 5 grupos: 40%.\n\nMNÊMICO:\n"F ratio = Between/Within"\n"η² = Quanto os grupos explicam"`,
        },
        quizzes: [
          { q: "Por que NÃO fazer 10 testes t para comparar 5 grupos CID?", ops: ["É demorado","P(pelo menos 1 falso positivo) sobe para ~40%","Dados precisam ser normais para t","Teste t não compara mais de 2 grupos"], c: 1, exp: "1−(0,95)^10 = 1−0,60 = 40% de chance de ao menos 1 falso positivo. A solução: Kruskal-Wallis (ou ANOVA) + post-hoc com Bonferroni, mantendo a taxa de erro controlada no nível do experimento." },
          { q: "ANOVA one-way, p=0,02, η²=0,03. Interpretação:", ops: ["Efeito grande e significativo","Significativo mas efeito pequeno (η²<0,06)","Não significativo","η²=0,03 = 3% de falsos positivos"], c: 1, exp: "p=0,02 → significativo. η²=0,03 → efeito pequeno (limiar 0,06 para médio). O fator explica apenas 3% da variância do TMP. Pode ser real mas de baixa relevância clínica para intervenção." },
          { q: "Levene test p=0,001 (variâncias desiguais). Qual post-hoc usar após ANOVA?", ops: ["Tukey HSD","Games-Howell (robusto a variâncias desiguais)","Scheffé apenas","Bonferroni não funciona aqui"], c: 1, exp: "Levene p<0,05 → variâncias desiguais. Tukey assume igualdade → inadequado. Games-Howell não assume igualdade de variâncias → correto nesse cenário. Welch's ANOVA também seria mais apropriada." },
          { q: "ANOVA two-way: CID × Médico sobre TMP. Quantos efeitos são testados?", ops: ["2 (um por fator)","3 (CID, Médico e interação CID×Médico)","11","30"], c: 1, exp: "ANOVA two-way testa: (1) efeito principal do CID, (2) efeito principal do Médico, (3) interação CID×Médico. A interação responde: 'O efeito do CID sobre TMP varia de acordo com o médico?' — frequentemente o resultado mais interessante clinicamente." },
        ],
      },
      {
        id: "correlacao", titulo: "Correlação — Pearson & Spearman",
        subtitulo: "Medir a força da relação. Nunca confundir com causalidade.",
        teoria: [
          { t: "intro", txt: "Correlação quantifica força e direção da associação entre duas variáveis. Nunca implica causalidade — esse é o erro mais comum na interpretação de dados em saúde." },
          { t: "h2", txt: "Pearson (r) — Para Normais" },
          { t: "formula", txt: "r = Σ(xᵢ-x̄)(yᵢ-ȳ) / √[Σ(xᵢ-x̄)²×Σ(yᵢ-ȳ)²]\n\nPressupostos: ambas normais, relação linear, sem outliers extremos.\nr² = variância de Y explicada por X" },
          { t: "h2", txt: "Spearman (rₛ) — Para o Resto" },
          { t: "formula", txt: "rₛ = 1 − 6Σdᵢ²/n(n²−1)\n\nTrabalha com postos (ranks). Qualquer variável ordinal ou não-normal.\nInterpretação da magnitude:\n< 0,10 → negligenciável\n0,10–0,29 → fraca\n0,30–0,49 → moderada\n0,50–0,69 → forte\n≥ 0,70 → muito forte" },
          { t: "caixa", cor: "red", txt: "ARMADILHAS CLÁSSICAS:\n• Correlação espúria: terceira variável confundidora\n• Quarteto de Anscombe: 4 datasets com r=0,816 e comportamentos completamente diferentes\n  → Sempre faça o gráfico de dispersão antes de interpretar r\n• Outliers criam ou destroem correlações em n pequeno\n• Restringir faixa de uma variável reduz artificialmente r\n\nMNÊMICO ANTI-ERRO:\n'Sorvete correlaciona com afogamento (confundidor: temperatura)'\nEm saúde: sempre pergunte qual terceira variável poderia explicar." },
        ],
        exemplo: {
          titulo: "Correlações nos dados reais",
          items: [
            `Hipótese: tempo de resposta CROSS correlaciona com TMP na enfermaria`,
            `Ambas não-normais → Spearman (rₛ estimado ≈ 0,35 — moderada, positiva)`,
            `rₛ²=0,35²=0,12 → CROSS explica ~12% da variância do TMP`,
            `Os outros 88%: complexidade clínica, critério do médico, vínculos familiares`,
            `CUIDADO: correlação não prova que CROSS CAUSA a permanência`,
            `Confundidor possível: casos mais graves pedem vaga E ficam mais tempo`,
          ],
        },
        ancora: {
          titulo: "Pearson para Normais. Spearman para o Resto.",
          txt: `Pearson: linear + normal + sem outliers\nSpearman: qualquer coisa que não seja Pearson\n\nr² = variância explicada\nr=0,3 → 9% explicado (pode ser relevante em saúde pública)\nr=0,7 → 49% explicado (forte — raro em sistemas complexos)\n\nSEMPRE faça o gráfico de dispersão antes de interpretar.\nUm r=0,9 pode ser gerado por poucos outliers.\n\nMNÊMICO: "Pearson para normais. Spearman para o resto."`,
        },
        quizzes: [
          { q: "rₛ=0,35 entre tempo CROSS e TMP. rₛ²=? O que significa?", ops: ["rₛ²=0,35 — correlação é 35%","rₛ²=0,12 — CROSS explica 12% da variância do TMP","rₛ²=0,06","Não se calcula r² para Spearman"], c: 1, exp: "rₛ²=0,35²=0,1225≈12%. O tempo de resposta regulatória explica ~12% da variância do TMP. É uma proporção relevante para uma variável operacional — justifica intervenção no processo CROSS." },
          { q: "r=0,85 entre número de funcionários no turno e incidentes. Conclusão?", ops: ["Mais funcionários causam incidentes","Associação forte mas provavelmente espúria — confundidor: turnos lotados têm mais funcionários E mais pacientes","Correlação negativa","r=0,85 confirma causalidade"], c: 1, exp: "Correlação espúria clássica. O confundidor: turnos de alta demanda têm mais funcionários E mais pacientes → mais chance de incidentes. A relação causal pode ser inversa: mais demanda → mais incidentes e mais funcionários alocados." },
        ],
      },
      {
        id: "regressao", titulo: "Regressão Linear & Logística",
        subtitulo: "Predizer valores, ajustar confundidores e construir modelos",
        teoria: [
          { t: "intro", txt: "Regressão vai além da correlação: prediz uma variável a partir de outras e, crucialmente, ajusta por confundidores simultaneamente — o que é impossível com testes bivariados." },
          { t: "h2", txt: "Regressão Linear Múltipla" },
          { t: "formula", txt: "Y = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ + ε\n\nCada β = efeito de X sobre Y mantendo as demais CONSTANTES\nR² = proporção da variância de Y explicada pelo modelo\nR² ajustado: penaliza por número de preditores" },
          { t: "h2", txt: "Regressão Logística — Desfecho Binário" },
          { t: "formula", txt: "log(p/1−p) = β₀ + β₁X₁ + ...\n\nOR = e^β\nOR=1: sem associação | OR>1: fator de risco | OR<1: protetor\n\nOR vs RR:\n• OR ≈ RR apenas quando desfecho RARO (<10%)\n• Desfecho comum (>10%): OR superestima RR → use Poisson" },
          { t: "h2", txt: "Tamanho Amostral para Logística" },
          { t: "formula", txt: "Regra: mínimo 10 EVENTOS por variável preditora\n\n${DB.app.longaPerm.n} casos de longa permanência → até ~8 preditores" },
          { t: "caixa", cor: "red", txt: `REGRA DOS 10 EVENTOS:\n${DB.app.longaPerm.n} casos de longa permanência >11d\n→ máximo ${Math.floor(DB.app.longaPerm.n/10)} preditores simultâneos no modelo\n\nIncluir mais → overfitting → modelo não generaliza\nSolução: selecionar apenas preditores biologicamente plausíveis` },
        ],
        exemplo: {
          titulo: "Modelo para Longa Permanência >11 dias",
          items: [
            `Desfecho: longa permanência >11d (${DB.app.longaPerm.n}/${DB.app.altaConfirmada} = ${DB.app.longaPerm.pct}%) → binário → logística`,
            `Preditores estimados: CID psicótico (OR≈3,8), sem histórico RAS (OR≈2,1), CROSS solicitado (OR≈4,2), vínculo familiar (OR≈0,6)`,
            `OR do psicótico (3,8) já descontou o efeito dos outros preditores — isso é ajuste por confundidor`,
            `Impossível fazer isso com qui-quadrado simples ou Mann-Whitney`,
            `Tamanho amostral: ${DB.app.longaPerm.n} eventos → comporta até ~${Math.floor(DB.app.longaPerm.n/10)} preditores`,
            `Validação: Hosmer-Lemeshow (calibração) + AUC-ROC (discriminação ≥0,75)`,
          ],
        },
        ancora: {
          titulo: "Linear Prediz Valores. Logística Prediz Probabilidades.",
          txt: `Desfecho contínuo (TMP em dias) → Regressão Linear\nDesfecho binário (internação S/N, reinternação S/N) → Regressão Logística\n\nOR = e^β (exponencial do coeficiente)\nOR=3,8 = 3,8× mais chance (NÃO 3,8% mais)\nOR abaixo de 1 protege. Na linha de 1: nada.\n\nREGRA DOS 10: mínimo 10 eventos por variável\n\nMNÊMICO:\n"Linear para contínuo. Logística para binário."\n"OR = e elevado ao β"`,
        },
        quizzes: [
          { q: "β para 'psicótico' na logística = 1,335. OR = ?", ops: ["OR=1,335","OR=e^1,335=3,8×","OR=3,8% mais risco","OR=2,7"], c: 1, exp: "OR = e^1,335 = 3,80. Psicóticos têm 3,8 VEZES mais chance de longa permanência (não 3,8%). Como longa permanência ocorre em 15,5% (>10%), OR superestima o RR real — Poisson modificado daria RR mais preciso." },
          { q: "Ajustar taxa de internação por médico pelo case-mix (CID). Método correto:", ops: ["Qui-quadrado estratificado","Regressão logística com CID como covariável","Mann-Whitney","Correlação de Spearman"], c: 1, exp: "Logística múltipla: desfecho=internação (S/N), preditores=médico+CID+turno. O β ajustado do médico representa o efeito após descontar o CID. Isso é ajuste por confundidor — impossível com qui-quadrado simples." },
          { q: `Modelo logístico com ${DB.app.longaPerm.n} eventos de longa permanência. Máximo de preditores simultâneos:`, ops: ["3 preditores","8 preditores","20 preditores","Sem limite"], c: 1, exp: `Regra: 10 eventos por variável. ${DB.app.longaPerm.n} eventos ÷ 10 = ${(DB.app.longaPerm.n/10).toFixed(1)} → máximo ~${Math.floor(DB.app.longaPerm.n/10)} preditores. Incluir mais gera overfitting — modelo se ajusta aos dados da amostra mas não generaliza.` },
        ],
      },
      {
        id: "roc", titulo: "Curva ROC & AUC",
        subtitulo: "Avaliar o desempenho de um score preditivo",
        teoria: [
          { t: "intro", txt: "A curva ROC avalia o desempenho de um modelo preditivo ao variar o ponto de corte. A AUC resume em um número a capacidade discriminativa do modelo." },
          { t: "h2", txt: "Os 4 Resultados Possíveis" },
          { t: "bullets", items: [
            { b: "VP (Verdadeiro Positivo):", txt: " longa permanência identificada corretamente" },
            { b: "FP (Falso Positivo):", txt: " alta normal identificada como risco (alarme falso)" },
            { b: "VN (Verdadeiro Negativo):", txt: " alta normal corretamente excluída" },
            { b: "FN (Falso Negativo):", txt: " longa permanência não detectada (miss clínico)" },
          ]},
          { t: "h2", txt: "Métricas" },
          { t: "formula", txt: "Sensibilidade = VP/(VP+FN) → 'De todos que TÊM, quantos detectei?'\nEspecificidade = VN/(VN+FP) → 'De todos que NÃO TÊM, quantos exclui?'\nVPP = VP/(VP+FP) → prob. de ter, dado positivo\nVPN = VN/(VN+FN) → prob. de não ter, dado negativo" },
          { t: "h2", txt: "AUC — Interpretação" },
          { t: "formula", txt: "0,5 = acaso (inútil)\n0,6–0,7 = fraco\n0,7–0,8 = aceitável\n0,8–0,9 = bom (uso clínico)\n> 0,9 = excelente (raro em medicina)\n\nAUC = P(score_caso > score_controle)" },
          { t: "caixa", cor: "amber", txt: `ESTRATÉGIA PARA ALERTA DE LONGA PERMANÊNCIA:\nCusto FN (não detectar) = leito bloqueado, giro comprometido (ALTO)\nCusto FP (alarme falso) = revisão clínica extra (BAIXO)\n→ Maximize SENSIBILIDADE no ponto de corte\n→ Prefira mais alarmes falsos a perder casos reais\n\nMNÊMICO: SnNOut = alta Sensibilidade, resultado Negativo exclui\n           SpPin = alta Especificidade, resultado Positivo confirma` },
        ],
        exemplo: {
          titulo: "Score de Longa Permanência — dados reais",
          items: [
            `Desfecho: longa permanência >11d (${DB.app.longaPerm.n}/${DB.app.altaConfirmada} = ${DB.app.longaPerm.pct}%)`,
            `Score hipotético: CID psicótico + sem histórico RAS + CROSS solicitado`,
            `AUC esperada: ~0,81 — bom para uso clínico`,
            `Ponto de corte "moderado": Sensibilidade=72%, Especificidade=74%`,
            `Estratégia: prefira sensibilidade → ponto de corte mais baixo → mais alarmes, menos misses`,
            `Implementação: app de plantão destaca automaticamente pacientes com score ≥ limiar`,
          ],
        },
        ancora: {
          titulo: "AUC: 0,5=Inútil | 0,8=Bom | 0,9=Excelente",
          txt: `Sensibilidade: "De todos que TÊM, quantos detectei?"\nEspecificidade: "De todos que NÃO TÊM, quantos exclui?"\n\nAumentando corte → sobe especificidade, cai sensibilidade\nDiminuindo corte → sobe sensibilidade, cai especificidade\n\nPARA ALERTAS CLÍNICOS: priorize sensibilidade\nCusto de FN (perder caso) > Custo de FP (alarme falso)\n\nMNÊMICO: "SnNOut e SpPin"`,
        },
        quizzes: [
          { q: "Score de longa permanência, AUC=0,81. Interpretação:", ops: ["81% dos casos são corretamente classificados","Em 81% das vezes distingue quem vai ter longa permanência de quem não vai","p-valor do modelo é 0,19","81% de sensibilidade"], c: 1, exp: "AUC=0,81: se você pegar um caso de longa permanência e um caso normal ao acaso, em 81% das vezes o score dará valor maior para o caso de longa permanência. Não é taxa de acerto geral — é medida de discriminação." },
          { q: "Para o alerta de longa permanência, qual métrica priorizar?", ops: ["Especificidade máxima","Sensibilidade máxima — não perder casos de risco","VPP máximo","AUC máxima independente do corte"], c: 1, exp: "Custo do FN (não detectar) = leito bloqueado, giro comprometido, impacto operacional. Custo do FP (alarme falso) = revisão extra, baixo custo. Maximize sensibilidade: prefira alarmes falsos a misses." },
        ],
      },
    ],
  },
  {
    id: "avancado", icon: "◈", label: "Avançado", cor: T.pink,
    topicos: [
      {
        id: "sobrevivencia", titulo: "Análise de Sobrevivência",
        subtitulo: "Kaplan-Meier, log-rank e Cox — quando o tempo é o desfecho",
        teoria: [
          { t: "intro", txt: "Análise de sobrevivência lida com tempo-até-evento. Não apenas SE ocorre, mas QUANDO. Em psiquiatria hospitalar: tempo até alta, tempo até reinternação, tempo até primeiro episódio pós-alta." },
          { t: "h2", txt: "O Problema da Censura" },
          { t: "caixa", cor: "pink", txt: `${DB.app.inconsistentes} pacientes no app de plantão têm 'alta em aberto' — sem data de alta registrada. São CENSURADOS: sabemos que ainda estavam internados, mas não quando terão alta.\n\nExcluí-los geraria viés de seleção: você analisaria apenas quem teve alta rápida, subestimando o TMP real.\n\nKaplan-Meier foi criado EXATAMENTE para usar essa informação parcial.` },
          { t: "h2", txt: "Estimador de Kaplan-Meier" },
          { t: "txt", txt: "Estima S(t) = P(ainda internado após t dias). Apresentado como curva descendente. Quedas verticais = altas. Tracinhos = censuras." },
          { t: "h2", txt: "Log-Rank Test" },
          { t: "txt", txt: "Compara curvas entre grupos. H₀: curvas são iguais. Usa toda a informação temporal — não apenas a proporção final." },
          { t: "h2", txt: "Modelo de Cox" },
          { t: "formula", txt: "Hazard Ratio (HR) = razão das taxas de ocorrência do evento\n\nHR>1: evento ocorre mais rápido no grupo exposto\nHR=0,72 para 'alta': taxa diária de alta é 28% menor (fica mais tempo)\n\nPressuposto fundamental: proporcionalidade dos riscos\n(teste de Schoenfeld para verificar)" },
        ],
        exemplo: {
          titulo: "KM e Cox no TMP por CID",
          items: [
            `KM por grupo CID: log-rank testa se as curvas de alta diferem entre CIDs`,
            `Esperado: psicóticos com curva mais 'alta' (demoram mais para ter alta)`,
            `Os ${DB.app.inconsistentes} censurados são INCLUÍDOS no KM — é exatamente para isso que existe`,
            `HR de 'vínculo familiar' no Cox: HR≈1,4 → família presente = alta 40% mais rápida`,
            `HR de 'sem histórico RAS': HR≈0,72 → alta 28% mais devagar`,
            `Cox ajusta todos os fatores simultaneamente — como logística mas para dados de tempo`,
          ],
        },
        ancora: {
          titulo: "KM Descreve. Log-rank Compara. Cox Ajusta.",
          txt: `Kaplan-Meier → visualizar a curva de sobrevivência (ou de 'permanência')\nLog-rank → comparar duas curvas\nCox → análise multivariada ajustando confundidores\n\nHR>1 (para alta): evento ocorre mais rápido = saem mais rápido\nHR<1 (para alta): evento demora mais = ficam mais tempo\n\nCensura NÃO é perda de dado — é informação parcial que KM e Cox aproveitam.\n\nMNÊMICO: "KM mostra. Log-rank testa. Cox explica."`,
        },
        quizzes: [
          { q: `Os ${DB.app.inconsistentes} 'alta em aberto' no app. Como tratar em análise de sobrevivência?`, ops: ["Excluir — dados incompletos","Imputar com a média do grupo","Censurar na data de extração — técnica criada para isso","Usar apenas os 528 com alta confirmada"], c: 2, exp: "Censurar é o tratamento correto. Sabemos que ainda estavam internados na data de extração. Excluí-los geraria viés de seleção. Kaplan-Meier inclui censurados corretamente, aproveitando a informação de que 'ainda não tiveram alta'." },
          { q: "HR=0,72 para 'sem histórico RAS' no Cox de TMP. Interpretação:", ops: ["Sem histórico aumenta 28% o TMP","Sem histórico → alta ocorre 28% mais devagar","OR de 0,72 para longa permanência","Fator protetor para internação"], c: 1, exp: "HR=0,72 para 'alta': taxa diária de alta é 28% menor (1−0,72) → alta demora mais. Esses pacientes precisam de mais tempo para estabilização e articulação de saída. Confirma que falta de vínculo com a rede prolonga o internamento." },
        ],
      },
      {
        id: "poder", titulo: "Poder & Tamanho Amostral",
        subtitulo: "Calcular n antes — nunca depois",
        teoria: [
          { t: "intro", txt: "Calcular tamanho amostral ANTES do estudo é obrigação metodológica. Post-hoc power (calcular depois de resultado negativo) é geralmente não informativo e potencialmente enganoso." },
          { t: "h2", txt: "Os 4 Parâmetros Interdependentes" },
          { t: "formula", txt: "Dado qualquer 3, o 4° é determinado.\n\nα (erro tipo I): convenção 0,05\nβ (erro tipo II): 1−β = poder → convenção ≥ 0,80\nd (tamanho do efeito): o quanto você quer detectar\nn: a incógnita que você resolve" },
          { t: "h2", txt: "d de Cohen para Diferença de Médias" },
          { t: "formula", txt: "d = (μ₁ − μ₂) / σ_pooled\n\nd=0,2 → pequeno | d=0,5 → médio | d=0,8 → grande\n\nn por grupo ≈ 2 × [(Z_α + Z_β) / d]²\nα=0,05, poder=0,80, d=0,5 → n≈64 por grupo" },
          { t: "h2", txt: "Tamanho do Efeito por Tipo de Teste" },
          { t: "bullets", items: [
            { b: "Qui-quadrado:", txt: " w de Cohen (0,1/0,3/0,5)" },
            { b: "Correlação:", txt: " r (0,1/0,3/0,5)" },
            { b: "ANOVA:", txt: " f de Cohen (0,1/0,25/0,4) ou η²" },
            { b: "Logística:", txt: " OR esperado + prevalência do desfecho" },
          ]},
          { t: "caixa", cor: "red", txt: "ARMADILHAS:\n• Superestimar o efeito → n insuficiente → erro tipo II\n• Não definir α e poder antes → risco de p-hacking\n• n muito grande → diferenças irrelevantes ficam significativas\n• Estudo negativo com poder <0,80: INCONCLUSIVO — não prove ausência de efeito\n\n'Ausência de evidência ≠ Evidência de ausência'" },
        ],
        exemplo: {
          titulo: "Estudo de Incidentes Agressivos na Enfermaria",
          items: [
            `Taxa basal: 8 incidentes/100 dias-paciente`,
            `Objetivo: detectar redução de 30% (para 5,6/100) com α=0,05 e poder=0,80`,
            `n calculado ≈ 150 dias-paciente por período (antes/depois)`,
            `15 leitos, TMP=6,4d → ~25 admissões/mês → ~100 dias-paciente/mês`,
            `→ 1,5 meses por período é suficiente para o estudo`,
            `ATENÇÃO: resultado negativo com poder=0,41 é inconclusivo — não prove ausência de efeito`,
          ],
        },
        ancora: {
          titulo: "α Protege do Falso Positivo. Poder Protege do Falso Negativo.",
          txt: `Poder <0,80 = estudo subdimensionado = conclusões não confiáveis\nEstudo negativo com poder <0,80 = inconclusivo\n\nn e poder: dobrar n aumenta poder substancialmente\n(relação complexa — use G*Power ou calculadora online)\n\nREGRA DE BOLSO:\nd=0,5 (médio) + α=0,05 + poder=0,80 → n≈64 por grupo\nd=0,2 (pequeno) → n≈394 por grupo (muito mais)\nd=0,8 (grande) → n≈26 por grupo (muito menos)\n\nMNÊMICO: "α = alarmes falsos que aceito. Poder = detecção que exijo."`,
        },
        quizzes: [
          { q: "Estudo: p=0,12, poder post-hoc=0,41. Conclusão correta:", ops: ["Não há diferença entre os grupos","Resultado inconclusivo — poder de 41% indica subdimensionamento","Erro tipo I ocorreu","p=0,12 confirma H₀"], c: 1, exp: "Poder 41% = 59% de chance de erro tipo II. O estudo tinha apenas 41% de chance de detectar a diferença mesmo se ela existisse. Resultado negativo com baixo poder é inconclusivo — não podemos afirmar que 'não há diferença'." },
          { q: "α=0,05, poder=0,80, d=0,5 (efeito médio). n por grupo ≈?", ops: ["n=30","n=64","n=100","n=200"], c: 1, exp: "n≈2×[(1,96+0,84)/0,5]²=2×[5,6]²=2×31,4≈64 por grupo (128 total). Com d=0,2 (pequeno): ~394 por grupo. Explica por que estudos hospitalares com n<50 raramente detectam efeitos moderados." },
        ],
      },
    ],
  },
  {
    id: "ferramentas", icon: "⌥", label: "Ferramentas", cor: T.cyan,
    topicos: [
      {
        id: "excel", titulo: "Excel — Estatística Aplicada",
        subtitulo: "O que fazer, o que não fazer e como fazer certo",
        teoria: [
          { t: "intro", txt: "O Excel é a ferramenta mais acessível e a mais mal usada em análise de dados hospitalares. Saber seus limites é tão importante quanto saber suas funções." },
          { t: "h2", txt: "Funções Estatísticas Essenciais" },
          { t: "bullets", items: [
            { b: "=MÉDIA() / =MÉDIASE():", txt: " média simples e condicional por critério" },
            { b: "=MED():", txt: " mediana — use sempre com MÉDIA para comparar" },
            { b: "=DESVPAD.A():", txt: " DP amostral (n-1). NUNCA use =DESVPAD.P() para amostras" },
            { b: "=QUARTIL(dados,1) e QUARTIL(dados,3):", txt: " Q1 e Q3 para calcular IQR" },
            { b: "=CORREL():", txt: " correlação de Pearson entre dois intervalos" },
            { b: "=CONT.SE() / =SOMASE():", txt: " contagens e somas condicionais" },
            { b: "=TESTE.T():", txt: " t-test para 2 grupos (apenas se normalidade atendida)" },
          ]},
          { t: "h2", txt: "Suplemento Análise de Dados" },
          { t: "caixa", cor: "cyan", txt: "ATIVAR: Arquivo → Opções → Suplementos → Ferramentas de Análise\n\nDISPONIBILIZA:\n• Estatística Descritiva completa (média, mediana, DP, min, max, curtose, assimetria)\n• Histograma com classes automáticas\n• t-test: médias com variâncias iguais ou desiguais\n• ANOVA: fator único e dois fatores\n• Correlação e covariância\n• Regressão linear (simples e múltipla com R², resíduos)\n\nSEM ESSE SUPLEMENTO você está limitado a funções individuais." },
          { t: "h2", txt: "O Que o Excel NÃO Faz — Use SPSS ou Python" },
          { t: "bullets", items: [
            { b: "Mann-Whitney:", txt: " não disponível nativamente" },
            { b: "Kruskal-Wallis:", txt: " não disponível" },
            { b: "Regressão logística:", txt: " não disponível" },
            { b: "Kaplan-Meier / Cox:", txt: " não disponível" },
            { b: "Qui-quadrado robusto:", txt: " limitado — use =TESTE.QUI2() com cuidado" },
            { b: "Shapiro-Wilk:", txt: " não disponível (use SPSS ou Python)" },
          ]},
        ],
        exemplo: {
          titulo: "Fórmulas para análise dos dados reais",
          items: [
            `=MÉDIASE(dias_internacao, cid_grupo, "F20-F29 Psicóticos") → TMP médio de psicóticos`,
            `=CONT.SE(status_final,"ALTA_CONFIRMADA")/CONT.VALORES(status_final) → % altas confirmadas`,
            `=CORREL(dias_internacao, tempo_cross_horas) → correlação de Pearson TMP×CROSS`,
            `Para Spearman: =ORDEM() nos dois vetores → =CORREL() nos postos`,
            `Tabela Dinâmica: Linhas=cid_grupo, Valores=Média(dias_internacao) → TMP por CID em 10 segundos`,
            `=QUARTIL(dias_internacao,3)-QUARTIL(dias_internacao,1) → IQR do TMP`,
          ],
        },
        ancora: {
          titulo: "Excel: Explorar e Descrever. SPSS/Python: Inferir.",
          txt: `Excel é excelente para:\n• Exploração inicial, Tabelas Dinâmicas, visualização básica\n• Médias, medianas, DPs, correlação de Pearson, t-test simples\n• Regressão linear com suplemento\n\nLimites do Excel:\n• Mann-Whitney, Kruskal-Wallis, logística, KM/Cox: não disponíveis\n• Shapiro-Wilk: não disponível\n• Grandes volumes (>100k linhas): lento\n\nMNÊMICO: "Excel para explorar. SPSS para publicar. Python para automatizar."`,
        },
        quizzes: [
          { q: "Calcular o desvio padrão amostral do TMP no Excel. Função correta:", ops: ["=DESVPAD.P()","=DESVPAD.A()","=VAR.P()","=DESVIO.MÉDIO()"], c: 1, exp: "=DESVPAD.A() usa denominador (n-1) — correção de Bessel para amostras. =DESVPAD.P() usa n — apenas para populações completas (muito raro em dados clínicos). Para dados hospitalares: sempre =DESVPAD.A()." },
          { q: "Você precisa de regressão logística no Excel. O que fazer?", ops: ["Usar =PROJ.LIN()","Usar Análise de Dados → Regressão","Excel não tem logística — usar SPSS ou Python","Usar =LOGÍSTICA()"], c: 2, exp: "Excel não tem regressão logística. =PROJ.LIN() e a regressão do suplemento são para regressão LINEAR. Para logística: SPSS (Analisar → Regressão → Logística Binária) ou Python (statsmodels.formula.api.logit)." },
          { q: "Para calcular a mediana do TMP no Excel por grupo de CID, o mais eficiente é:", ops: ["=MED() em cada grupo manualmente","Tabela Dinâmica com Valor=Mediana por CID","=MÉDIASE() — calcula a mediana condicional","=PROCV() com função aninhada"], c: 1, exp: "Tabela Dinâmica: insira o campo CID nas Linhas e dias_internacao nos Valores. Clique em 'Soma' → 'Configurações do Campo de Valor' → selecione 'Mediana'. Resultado: tabela completa de medianas por CID em segundos." },
        ],
      },
      {
        id: "spss", titulo: "SPSS — O Padrão Ouro Clínico",
        subtitulo: "Interface point-and-click com output pronto para publicação",
        teoria: [
          { t: "intro", txt: "SPSS (Statistical Package for the Social Sciences) é o software mais utilizado em pesquisa clínica no Brasil. Interface visual, sem necessidade de código, output organizado para artigos." },
          { t: "h2", txt: "Fluxo de Trabalho" },
          { t: "bullets", items: [
            { b: "1. Variable View:", txt: " definir tipo (numérico/string), escala (nominal/ordinal/scale), rótulos de valores" },
            { b: "2. Data View:", txt: " inserir dados ou importar (File → Import → Excel/CSV)" },
            { b: "3. Analyze:", txt: " menu principal para todos os testes" },
            { b: "4. Paste → Save:", txt: " SEMPRE salvar a sintaxe antes de OK — reprodutibilidade" },
          ]},
          { t: "h2", txt: "Mapa de Testes por Menu" },
          { t: "caixa", cor: "cyan", txt: "Analyze → Descriptive Statistics → Explore\n→ Shapiro-Wilk, boxplot, descritivos por grupo\n\nAnalyze → Nonparametric → Legacy Dialogs\n→ 2 Independent Samples: Mann-Whitney\n→ K Independent Samples: Kruskal-Wallis\n→ 2 Related Samples: Wilcoxon signed-rank\n\nAnalyze → Compare Means → One-Way ANOVA\n→ Post-hoc: Tukey ou Games-Howell\n\nAnalyze → Regression → Binary Logistic\n→ Regressão logística com OR, IC95%, Hosmer-Lemeshow\n\nAnalyze → Survival → Kaplan-Meier\n→ Log-rank automático por grupo\n\nAnalyze → Survival → Cox Regression\n→ Hazard Ratios com IC95%" },
          { t: "h2", txt: "Preparação dos Dados" },
          { t: "bullets", items: [
            { b: "Recodificar:", txt: " Transform → Recode → CIDs em grupos (F20-F29=1, F30-F39=2...)" },
            { b: "Calcular:", txt: " Transform → Compute → dias = data_alta − data_internacao" },
            { b: "Filtrar:", txt: " Data → Select Cases → apenas ALTA_CONFIRMADA" },
            { b: "Identificar outliers:", txt: " Analyze → Explore → marcar Outliers no boxplot" },
          ]},
        ],
        exemplo: {
          titulo: "Analisando TMP por CID no SPSS — Passo a Passo",
          items: [
            `1. Importar: File → Import Data → Excel → selecionar base_internacao.xlsx`,
            `2. Normalidade: Analyze → Descriptive Statistics → Explore → Plots → Normality plots with tests`,
            `3. Shapiro-Wilk p<0,05 para algum grupo → Kruskal-Wallis:`,
            `   Analyze → Nonparametric → Legacy Dialogs → K Independent Samples`,
            `   Test Variable: dias_internacao | Grouping Variable: cid_grupo`,
            `4. Post-hoc: 2 Independent Samples par a par → Bonferroni manual (α/10=0,005)`,
            `5. Reportar: H(4)=XX, p<0,001, η²=XX — tamanho do efeito calculado separadamente`,
          ],
        },
        ancora: {
          titulo: "SPSS: Sempre Explore Primeiro, Sempre Salve a Sintaxe",
          txt: `PASSO 1 SEMPRE: Analyze → Descriptive Statistics → Explore\n→ Shapiro-Wilk → decide qual caminho seguir\n\nCAMINHO PARAMÉTRICO (normal):\nANOVA → Tukey → reportar F, p, η²\n\nCAMINHO NÃO-PARAMÉTRICO (assimétrico):\nKruskal-Wallis → Mann-Whitney par a par → Bonferroni\n\nSINTAXE: Paste → Save (.sps) → roda novamente em segundos\nSem sintaxe: você não consegue reproduzir a análise 6 meses depois\n\nMNÊMICO: "Explore sempre. Salve sempre. Paste antes de OK."`,
        },
        quizzes: [
          { q: "No SPSS, onde rodar o Kaplan-Meier?", ops: ["Analyze → Compare Means","Analyze → Regression → Binary Logistic","Analyze → Survival → Kaplan-Meier","Analyze → Nonparametric"], c: 2, exp: "Analyze → Survival → Kaplan-Meier. O log-rank test para comparação entre grupos é gerado automaticamente. Para Cox: Analyze → Survival → Cox Regression. O menu Survival tem tudo para análise de tempo-até-evento." },
          { q: "Como garantir reprodutibilidade da análise no SPSS?", ops: ["Anotar resultados no Word","Clicar Paste antes de OK → salvar arquivo .sps","Tirar print do output","Usar sempre os mesmos valores de corte"], c: 1, exp: "Sintaxe SPSS (.sps) reproduz exatamente a análise. 'Paste' registra o comando antes de executar. 6 meses depois, com novos dados mensais: você apenas muda o arquivo de entrada e roda a sintaxe — análise idêntica em segundos." },
          { q: "No SPSS, definir 'prioridade de triagem' (verde/amarelo/laranja/vermelho) corretamente:", ops: ["Scale — é uma escala de 4 pontos","Nominal — é categórica","Ordinal — tem ordem mas intervalos desiguais","String — é texto"], c: 2, exp: "Ordinal: existe ordem (verde<amarelo<laranja<vermelho) mas os intervalos entre categorias não são iguais. Definir como 'Scale' faria o SPSS permitir média de prioridade — incorreto. Definir como 'Nominal' perderia a informação de ordem." },
        ],
      },
      {
        id: "python", titulo: "Python — Análise e Automação",
        subtitulo: "Relatório mensal automático e machine learning aplicado",
        teoria: [
          { t: "intro", txt: "Python é a ferramenta mais poderosa para análise de dados em saúde. Gratuito, reprodutível, automatizável. Uma vez escrito o script, o relatório mensal roda em 30 segundos." },
          { t: "h2", txt: "Bibliotecas Essenciais — Memorize Esse Mapa" },
          { t: "bullets", items: [
            { b: "pandas:", txt: " ler Excel/CSV, filtrar, agrupar, calcular — base de tudo" },
            { b: "scipy.stats:", txt: " Mann-Whitney, Kruskal-Wallis, qui-quadrado, Shapiro-Wilk, Spearman" },
            { b: "statsmodels:", txt: " regressão logística, linear, ANOVA, intervalos de confiança" },
            { b: "lifelines:", txt: " Kaplan-Meier, Cox, análise de sobrevivência" },
            { b: "sklearn:", txt: " ROC/AUC, cross-validation, métricas de classificação" },
            { b: "matplotlib/seaborn:", txt: " boxplot, histograma, curva ROC, KM — visualização" },
          ]},
          { t: "h2", txt: "Templates de Código — Copie e Use" },
          { t: "formula", txt: `import pandas as pd\nfrom scipy import stats\n\n# Carregar e filtrar dados\ndf = pd.read_excel('app_plantao.xlsx')\ndf_ok = df[df['status_final']=='ALTA_CONFIRMADA']\n\n# 1. Normalidade\nstat, p = stats.shapiro(df_ok['dias_internacao'])\nprint(f'Shapiro-Wilk: p={p:.4f}')  # p<0,05 → não-paramétrico\n\n# 2. Mann-Whitney (2 grupos)\npsico = df_ok[df_ok['cid_grupo']=='F20-F29']['dias_internacao']\nbipol = df_ok[df_ok['cid_grupo']=='F30-F39']['dias_internacao']\nstat, p = stats.mannwhitneyu(psico, bipol, alternative='two-sided')\nprint(f'Mann-Whitney: p={p:.4f}')\n\n# 3. Kruskal-Wallis (3+ grupos)\ngrupos = [df_ok[df_ok['cid_grupo']==g]['dias_internacao']\n          for g in df_ok['cid_grupo'].unique()]\nstat, p = stats.kruskal(*grupos)\nprint(f'Kruskal-Wallis: p={p:.4f}')\n\n# 4. Regressão Logística\nfrom statsmodels.formula.api import logit\nmodel = logit('longa_perm ~ cid_psicotico + sem_ras + cross_solicitado',\n              data=df_ok).fit()\nimport numpy as np\nprint('OR:', model.params.apply(lambda x: round(np.exp(x),2)))\n\n# 5. Curva ROC\nfrom sklearn.metrics import roc_auc_score\nauc = roc_auc_score(df_ok['longa_perm'], df_ok['score'])\nprint(f'AUC: {auc:.3f}')` },
          { t: "h2", txt: "Relatório Mensal Automatizado — O Objetivo Final" },
          { t: "caixa", cor: "cyan", txt: "FLUXO COMPLETO COM n8n:\n1. Upload semanal das planilhas (gatilho no n8n)\n2. Script Python calcula todos os indicadores\n3. Compara com mês anterior (variação, tendência)\n4. Gera gráficos e análise narrativa\n5. Exporta PDF com relatório completo\n6. Envia por email/WhatsApp automaticamente\n\nTempo de execução após configurado: ~30 segundos\nTempo manual equivalente: 4-6 horas por mês" },
        ],
        exemplo: {
          titulo: "Automatizando análise dos dados reais",
          items: [
            `Script lê URGENCIA_COM_TRIAGEM.xlsx + base_internacao.xlsx + app_plantao.xlsx`,
            `Calcula: TMP médio/mediana, taxa de evasão, longa permanência, reinternação 30d`,
            `Testa normalidade (Shapiro-Wilk) → escolhe teste automaticamente`,
            `Compara com mês anterior: Mann-Whitney para TMP, qui-quadrado para taxas`,
            `Gera: boxplot por CID, gráfico CROSS, KM por grupo diagnóstico`,
            `Exporta PDF + narrativa automática → entregue por email toda primeira segunda do mês`,
          ],
        },
        ancora: {
          titulo: "pandas lê. scipy testa. statsmodels modela. lifelines sobrevive. sklearn prediz.",
          txt: `MAPA MENTAL DAS BIBLIOTECAS:\npandas → manipulação de dados (ler, filtrar, agrupar)\nscipy.stats → todos os testes estatísticos não-paramétricos\nstatsmodels → regressão e modelos com output detalhado\nlifelines → Kaplan-Meier e Cox\nsklearn → ROC/AUC, machine learning\n\nPRINCÍPIO: uma análise que você faz 1 vez: use SPSS\nUma análise que você repete todo mês: use Python\n\nMNÊMICO: "pandas lê. scipy testa. statsmodels modela."`,
        },
        quizzes: [
          { q: "Rodar Mann-Whitney no Python. Função correta:", ops: ["scipy.stats.ttest_ind()","scipy.stats.mannwhitneyu()","statsmodels.logit()","pandas.corr()"], c: 1, exp: "scipy.stats.mannwhitneyu(grupo1, grupo2, alternative='two-sided'). Para Kruskal-Wallis: scipy.stats.kruskal(*grupos). Para Shapiro-Wilk: scipy.stats.shapiro(dados). Para Spearman: scipy.stats.spearmanr(x, y)." },
          { q: "Você quer automatizar o relatório mensal. Melhor abordagem:", ops: ["Refazer tudo no Excel todo mês","Script Python + n8n rodando automaticamente","SPSS com sintaxe salva","Contratar analista"], c: 1, exp: "Script Python + n8n: upload das planilhas → Python calcula → relatório gerado automaticamente. Uma vez escrito e testado, roda sem intervenção. É a diferença entre análise ad hoc e sistema analítico institucional permanente." },
          { q: "Para regressão logística com output formatado (OR, IC95%, p-valor) em Python:", ops: ["sklearn.linear_model.LogisticRegression()","statsmodels.formula.api.logit().fit()","scipy.stats.logistic()","pandas.get_dummies()"], c: 1, exp: "statsmodels.formula.api.logit() gera output completo com coeficientes, erro padrão, p-valores e IC95%. OR = np.exp(model.params). sklearn.LogisticRegression também faz logística mas com output menos detalhado para interpretação clínica." },
        ],
      },
    ],
  },
];

// ─── COMPONENTES ──────────────────────────────────────────────────────────────
function Pill({ txt, cor }) {
  return <span style={{ display:"inline-block", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:`${cor}22`, color:cor }}>{txt}</span>;
}

function renderBloco(b, i, cor) {
  switch(b.t) {
    case "intro": return <div key={i} style={{ fontSize:14, color:T.text, lineHeight:1.8, marginBottom:16, borderLeft:`3px solid ${cor}`, paddingLeft:14, fontFamily:T.font }}>{b.txt}</div>;
    case "h2":    return <div key={i} style={{ fontSize:11, fontWeight:700, color:cor, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:20, marginBottom:8 }}>{b.txt}</div>;
    case "txt":   return <div key={i} style={{ fontSize:13, color:T.text, lineHeight:1.75, marginBottom:10, fontFamily:T.font }}>{b.txt}</div>;
    case "formula": return (
      <div key={i} style={{ background:T.bg, border:`1px solid ${cor}44`, borderRadius:8, padding:"12px 16px", marginBottom:12 }}>
        <pre style={{ fontFamily:T.mono, fontSize:11.5, color:cor, whiteSpace:"pre-wrap", margin:0, lineHeight:1.7 }}>{b.txt}</pre>
      </div>
    );
    case "bullets": return (
      <div key={i} style={{ marginBottom:12 }}>
        {b.items.map((it,j) => (
          <div key={j} style={{ display:"flex", gap:8, marginBottom:6, paddingLeft:8 }}>
            <span style={{ color:cor, flexShrink:0 }}>▸</span>
            <div style={{ fontSize:13, color:T.text, lineHeight:1.65, fontFamily:T.font }}>
              <strong style={{ color:"#fff" }}>{it.b}</strong>{it.txt}
            </div>
          </div>
        ))}
      </div>
    );
    case "caixa": {
      const cm = { amber:T.amber, red:T.red, green:T.green, cyan:T.cyan, violet:T.violet, pink:T.pink, accent:T.accent };
      const c = cm[b.cor] || T.accent;
      return (
        <div key={i} style={{ background:`${c}11`, border:`1px solid ${c}44`, borderRadius:8, padding:"13px 16px", marginBottom:12 }}>
          <pre style={{ fontFamily:T.font, fontSize:13, color:T.text, whiteSpace:"pre-wrap", margin:0, lineHeight:1.7 }}>{b.txt}</pre>
        </div>
      );
    }
    default: return null;
  }
}

function QuizEngine({ quizzes, cor }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [hist, setHist] = useState([]);
  const [fim, setFim] = useState(false);
  const q = quizzes[idx];

  const responder = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.c) setAcertos(a=>a+1);
    setHist(h=>[...h, i===q.c]);
  };
  const avancar = () => {
    if (idx < quizzes.length-1) { setIdx(i=>i+1); setSel(null); }
    else setFim(true);
  };
  const reset = () => { setIdx(0); setSel(null); setAcertos(0); setHist([]); setFim(false); };

  if (fim) {
    const pct = Math.round((acertos/quizzes.length)*100);
    return (
      <div style={{ textAlign:"center", padding:"40px 20px", background:T.card, borderRadius:12, border:`1px solid ${T.border}` }}>
        <div style={{ fontSize:48, marginBottom:12 }}>{pct>=80?"🎯":pct>=60?"📈":"📚"}</div>
        <div style={{ fontSize:30, fontWeight:700, color:pct>=80?T.green:pct>=60?T.gold:T.red, marginBottom:8 }}>{acertos}/{quizzes.length} — {pct}%</div>
        <div style={{ fontSize:13, color:T.textSub, marginBottom:24 }}>
          {pct>=80?"Domínio sólido. Avance para o próximo tópico.":pct>=60?"Bom progresso. Revise os erros antes de avançar.":"Releia a teoria e as âncoras antes de refazer."}
        </div>
        <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:24 }}>
          {hist.map((ok,i) => <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:ok?T.green:T.red }} />)}
        </div>
        <button onClick={reset} style={{ padding:"12px 32px", background:cor, color:"#fff", border:"none", borderRadius:10, fontSize:14, cursor:"pointer", fontWeight:700, fontFamily:T.font }}>
          Refazer Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ fontSize:11, color:T.textMuted }}>Questão {idx+1} de {quizzes.length}</span>
        <span style={{ fontSize:11, color:T.green, fontWeight:600 }}>{acertos} acerto{acertos!==1?"s":""}</span>
      </div>
      <div style={{ background:T.border, borderRadius:99, height:3, marginBottom:16, overflow:"hidden" }}>
        <div style={{ width:`${((idx+(sel!==null?1:0))/quizzes.length)*100}%`, height:"100%", background:cor, transition:"width 0.4s" }} />
      </div>
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"20px" }}>
        <div style={{ fontSize:14, color:T.text, lineHeight:1.7, marginBottom:18, fontWeight:500, fontFamily:T.font }}>{q.q}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {q.ops.map((op,i) => {
            let bg=T.surface, bdr=T.border, clr=T.text;
            if (sel!==null) {
              if (i===q.c) { bg=T.greenDim; bdr=T.green; clr=T.green; }
              else if (i===sel) { bg=T.redDim; bdr=T.red; clr=T.red; }
            }
            return (
              <button key={i} onClick={()=>responder(i)} style={{
                background:bg, border:`1px solid ${bdr}`, borderRadius:8, padding:"11px 14px",
                textAlign:"left", cursor:sel!==null?"default":"pointer",
                color:clr, fontSize:13, lineHeight:1.5, fontFamily:T.font, transition:"all 0.2s",
              }}>
                <span style={{ fontWeight:700, marginRight:8, opacity:0.5 }}>{String.fromCharCode(65+i)}.</span>{op}
              </button>
            );
          })}
        </div>
        {sel!==null && (
          <div style={{ marginTop:14, background:T.bg, borderRadius:8, padding:"13px 16px", borderLeft:`3px solid ${sel===q.c?T.green:T.red}` }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:sel===q.c?T.green:T.red, marginBottom:6 }}>
              {sel===q.c?"✓ Correto":"✗ Incorreto"}
            </div>
            <div style={{ fontSize:13, color:T.text, lineHeight:1.7, fontFamily:T.font }}>{q.exp}</div>
          </div>
        )}
        {sel!==null && (
          <button onClick={avancar} style={{ marginTop:12, width:"100%", padding:"11px", background:cor, color:"#fff", border:"none", borderRadius:8, fontSize:13, cursor:"pointer", fontWeight:700, fontFamily:T.font }}>
            {idx<quizzes.length-1?"Próxima questão →":"Ver resultado"}
          </button>
        )}
      </div>
    </div>
  );
}

function TopicoView({ topico, cor }) {
  const [aba, setAba] = useState("teoria");
  const abas = [
    { id:"teoria", label:"Teoria" },
    { id:"exemplo", label:"Exemplo Real" },
    { id:"ancora", label:"Memorização" },
    { id:"quiz", label:`Quiz (${topico.quizzes.length})` },
  ];
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:22, fontWeight:700, color:T.text, marginBottom:6, letterSpacing:"-0.02em" }}>{topico.titulo}</div>
        <div style={{ fontSize:13, color:T.textSub, fontStyle:"italic" }}>{topico.subtitulo}</div>
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
        {abas.map(a => (
          <button key={a.id} onClick={()=>setAba(a.id)} style={{
            padding:"7px 16px", border:`1px solid ${aba===a.id?cor:T.border}`,
            background:aba===a.id?cor:T.surface, color:aba===a.id?"#fff":T.textMuted,
            borderRadius:99, fontSize:12, cursor:"pointer", fontFamily:T.font,
            fontWeight:aba===a.id?700:400, transition:"all 0.2s",
          }}>{a.label}</button>
        ))}
      </div>
      {aba==="teoria" && (
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"22px 24px" }}>
          {topico.teoria.map((b,i) => renderBloco(b,i,cor))}
        </div>
      )}
      {aba==="exemplo" && (
        <div style={{ background:T.card, border:`1px solid ${cor}44`, borderRadius:12, padding:"22px 24px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:cor, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>
            📍 {topico.exemplo.titulo}
          </div>
          {topico.exemplo.items.map((item,i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
              <span style={{ color:cor, flexShrink:0, marginTop:2, fontSize:12 }}>{i+1}.</span>
              <div style={{ fontSize:13, color:T.text, lineHeight:1.7, fontFamily:T.font }}>{item}</div>
            </div>
          ))}
        </div>
      )}
      {aba==="ancora" && (
        <div style={{ background:T.goldDim, border:`1px solid ${T.gold}55`, borderRadius:12, padding:"22px 24px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.gold, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>🧠 {topico.ancora.titulo}</div>
          <pre style={{ fontFamily:T.font, fontSize:14, color:T.text, whiteSpace:"pre-wrap", lineHeight:1.85, margin:0 }}>{topico.ancora.txt}</pre>
        </div>
      )}
      {aba==="quiz" && <QuizEngine quizzes={topico.quizzes} cor={cor} />}
    </div>
  );
}

// ─── PAINEL ANALÍTICO ─────────────────────────────────────────────────────────
function PainelAnalitico() {
  const s = DB.internacao.sazonalidade;
  const maxV = Math.max(...s.valores);
  return (
    <div style={{ padding:"0 0 40px" }}>
      <div style={{ background:`linear-gradient(135deg,${T.surface},${T.card})`, border:`1px solid ${T.border}`, borderRadius:12, padding:"20px 24px", marginBottom:20 }}>
        <div style={{ fontSize:10, color:T.textMuted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Psiquiatria Hospitalar — Base Integrada de Dados</div>
        <div style={{ fontSize:18, fontWeight:700, color:T.text }}>Painel Analítico do Serviço</div>
        <div style={{ fontSize:12, color:T.textSub, marginTop:4 }}>7 fontes · {(DB.ps.total + DB.internacao.total + DB.app.total).toLocaleString()}+ registros · Jan/2024–Mai/2026</div>
      </div>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10, marginBottom:20 }}>
        {[
          { l:"Atendimentos PS", v:DB.ps.total.toLocaleString(), sub:DB.ps.periodo, cor:T.accent },
          { l:"Taxa de Evasão PS", v:`${DB.ps.taxaEvasao}%`, sub:"753 casos", cor:T.amber },
          { l:"TMP Real Confirmado", v:`${DB.app.tmpMedio}d`, sub:`mediana ${DB.app.tmpMediana}d | n=${DB.app.altaConfirmada}`, cor:T.green },
          { l:"Longa Perm. >11d", v:`${DB.app.longaPerm.pct}%`, sub:`${DB.app.longaPerm.n} de ${DB.app.altaConfirmada} altas`, cor:T.amber },
          { l:"Reinternação 30d", v:`${DB.app.reinternacao.pct30}%`, sub:"meta <8% OMS", cor:T.green },
          { l:"Vaga CROSS 2026", v:`${DB.cross[2].taxa}%`, sub:`era ${DB.cross[0].taxa}% em 2024`, cor:T.red },
        ].map((k,i) => (
          <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, color:T.textMuted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>{k.l}</div>
            <div style={{ fontSize:22, fontWeight:700, color:k.cor, letterSpacing:"-0.02em" }}>{k.v}</div>
            <div style={{ fontSize:11, color:T.textMuted, marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      {/* Sazonalidade */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"20px 24px", marginBottom:16 }}>
        <div style={{ fontSize:11, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Sazonalidade — Índice Mensal de Internações (média=100)</div>
        <div style={{ fontSize:12, color:T.textSub, marginBottom:16 }}>Julho: +{s.indices[6]-100}% acima da média | Fevereiro: {s.indices[1]-100}% abaixo</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:100 }}>
          {s.valores.map((v,i) => {
            const h=(v/maxV)*100, isHigh=s.indices[i]>=110, isLow=s.indices[i]<=80;
            const cor=isHigh?T.red:isLow?T.green:T.accent;
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                <div style={{ fontSize:9, fontWeight:700, color:cor }}>{s.indices[i]}</div>
                <div style={{ width:"100%", height:`${h}%`, background:cor, borderRadius:"2px 2px 0 0", minHeight:4, opacity:0.9 }} />
                <div style={{ fontSize:9, color:T.textMuted }}>{s.meses[i]}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* CROSS + CAPS */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:16 }}>
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Regulação CROSS — Queda da Taxa de Vaga</div>
          {DB.cross.map((r,i) => {
            const cor=i===0?T.green:i===1?T.amber:T.red;
            return (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color:T.textSub }}>{r.ano} (n={r.total})</span>
                  <span style={{ fontSize:13, fontWeight:700, color:cor }}>{r.taxa}%</span>
                </div>
                <div style={{ background:T.border, borderRadius:3, height:14, overflow:"hidden" }}>
                  <div style={{ width:`${(r.taxa/60)*100}%`, height:"100%", background:cor, borderRadius:3 }} />
                </div>
                <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Tempo médio resposta: {r.tempoH}h | Resolvidas em <24h: {r.pct24h}%</div>
              </div>
            );
          })}
          <div style={{ marginTop:10, padding:"10px 12px", background:`${T.red}11`, border:`1px solid ${T.red}33`, borderRadius:8 }}>
            <div style={{ fontSize:11, color:T.red, fontWeight:700 }}>⚠ Queda de −{Math.round((1-DB.cross[2].taxa/DB.cross[0].taxa)*100)}% em 2 anos</div>
          </div>
        </div>
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>CAPS com Mais Internações</div>
          {DB.monitoramento.caps.map((c,i) => (
            <div key={i} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                <div style={{ fontSize:11, color:T.textSub }}>{c.nome.replace("Adulto ","Ad.").replace("ADULTO ","Ad.")}</div>
                <div style={{ display:"flex", gap:8 }}>
                  <span style={{ fontSize:11, color:T.text, fontWeight:600 }}>{c.n}</span>
                  <span style={{ fontSize:10, color:c.semHistorico>55?T.red:T.amber }}>{c.semHistorico}% s/hist.</span>
                </div>
              </div>
              <div style={{ background:T.border, borderRadius:2, height:6, overflow:"hidden" }}>
                <div style={{ width:`${(c.n/DB.monitoramento.caps[0].n)*100}%`, height:"100%", background:T.violet }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* TMP por CID */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:11, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>TMP por Grupo CID — Alta Confirmada (mediana em dias)</div>
        {DB.app.tmpPorCid.slice(0,6).map((c,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <div style={{ fontSize:11, color:T.textSub, width:170, flexShrink:0 }}>{c.grupo}</div>
            <div style={{ flex:1, background:T.border, borderRadius:3, height:18, overflow:"hidden" }}>
              <div style={{ width:`${(c.media/12)*100}%`, height:"100%", background:T.violet, display:"flex", alignItems:"center", paddingLeft:6 }}>
                <span style={{ fontSize:10, color:"#fff", fontWeight:700 }}>{c.media}d</span>
              </div>
            </div>
            <div style={{ fontSize:10, color:T.textMuted, width:60 }}>mediana {c.mediana}d</div>
            <div style={{ fontSize:10, color:T.textMuted, width:40 }}>n={c.n}</div>
          </div>
        ))}
      </div>
      {/* Insights */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px" }}>
        <div style={{ fontSize:11, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>Insights Críticos e Acionáveis</div>
        {[
          { cor:T.red, tag:"Urgente", txt:`Regulação em colapso: taxa CROSS caiu de ${DB.cross[0].taxa}% (2024) para ${DB.cross[2].taxa}% (2026). Tempo médio de resposta ${DB.cross[2].tempoH}h. Pacientes esperam vaga 3 dias em leito que poderia rodar.` },
          { cor:T.red, tag:"Alta", txt:`Itaquera (${DB.monitoramento.caps[4].semHistorico}%) e Itaim Paulista (${DB.monitoramento.caps[5].semHistorico}%): maioria dos internados chega sem histórico no CAPS de referência. Vínculo existe burocraticamente, não clinicamente.` },
          { cor:T.amber, tag:"Atenção", txt:`${DB.monitoramento.procedenciaResidencia}% das internações vêm diretamente da residência — sem passar por CAPS ou UBS antes. Ruptura sistemática da linha de cuidado.` },
          { cor:T.amber, tag:"Atenção", txt:`Longa permanência >11 dias: ${DB.app.longaPerm.pct}% das altas (${DB.app.longaPerm.n} casos). Psicóticos: ${DB.app.tmpPorCid[0].n} internações com TMP médio ${DB.app.tmpPorCid[0].media}d. Cada caso >11d ocupa leito que poderia girar 2,5x.` },
          { cor:T.green, tag:"Oportunidade", txt:`${DB.monitoramento.vinculoFamiliar}% dos internados têm vínculo familiar. Ativo subutilizado: protocolo estruturado de engajamento familiar pode reduzir TMP e reinternação simultaneamente.` },
        ].map((ins,i) => (
          <div key={i} style={{ display:"flex", gap:12, marginBottom:10, padding:"11px 14px", background:`${ins.cor}0D`, border:`1px solid ${ins.cor}33`, borderRadius:8 }}>
            <div style={{ flexShrink:0 }}><Pill txt={ins.tag} cor={ins.cor} /></div>
            <div style={{ fontSize:13, color:T.text, lineHeight:1.65, fontFamily:T.font }}>{ins.txt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [secao, setSecao] = useState("painel");
  const [modId, setModId] = useState("fundamentos");
  const [topId, setTopId] = useState("variaveis");

  const modAtual = MODULOS.find(m=>m.id===modId);
  const topAtual = modAtual?.topicos.find(t=>t.id===topId);
  const todosTop = MODULOS.flatMap(m=>m.topicos.map(t=>({...t,modId:m.id,modCor:m.cor})));
  const idxG = todosTop.findIndex(t=>t.id===topId);
  const ant = todosTop[idxG-1];
  const prox = todosTop[idxG+1];
  const totalQ = todosTop.reduce((a,t)=>a+t.quizzes.length,0);

  const irPara = (t) => { setModId(t.modId); setTopId(t.id); setSecao("estudo"); };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:T.font, display:"flex", flexDirection:"column" }}>
      {/* TOP BAR */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"0 20px", display:"flex", alignItems:"stretch", height:56, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginRight:32 }}>
          <div style={{ width:8, height:8, background:T.accent, borderRadius:"50%", boxShadow:`0 0 10px ${T.accent}` }} />
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>PsiqStat</div>
            <div style={{ fontSize:9, color:T.textMuted, letterSpacing:"0.06em", textTransform:"uppercase" }}>Estatística · Psiquiatria Hospitalar</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"stretch", gap:2 }}>
          {[{id:"painel",label:"◈ Painel Analítico"},{id:"estudo",label:"§ Estatística Aplicada"}].map(s => (
            <button key={s.id} onClick={()=>setSecao(s.id)} style={{
              padding:"0 20px", border:"none", background:"transparent",
              color:secao===s.id?T.accent:T.textMuted,
              borderBottom:secao===s.id?`2px solid ${T.accent}`:"2px solid transparent",
              fontSize:13, cursor:"pointer", fontFamily:T.font,
              fontWeight:secao===s.id?700:400, transition:"all 0.2s", whiteSpace:"nowrap",
            }}>{s.label}</button>
          ))}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center" }}>
          <div style={{ fontSize:11, color:T.textMuted, textAlign:"right" }}>
            <span style={{ color:T.gold, fontWeight:700 }}>{totalQ} questões</span>
            <span style={{ margin:"0 6px", opacity:0.3 }}>·</span>
            <span>{todosTop.length} tópicos</span>
          </div>
        </div>
      </div>

      {secao==="painel" && (
        <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
          <PainelAnalitico />
        </div>
      )}

      {secao==="estudo" && (
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          {/* Sidebar */}
          <div style={{ width:230, background:T.surface, borderRight:`1px solid ${T.border}`, overflowY:"auto", flexShrink:0 }}>
            {MODULOS.map(m => (
              <div key={m.id}>
                <div style={{ padding:"12px 16px 6px", fontSize:10, color:m.cor, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:700, display:"flex", gap:6 }}>
                  <span>{m.icon}</span>{m.label}
                </div>
                {m.topicos.map(t => (
                  <button key={t.id} onClick={()=>{setModId(m.id);setTopId(t.id);}} style={{
                    display:"block", width:"100%", textAlign:"left", padding:"9px 16px 9px 24px",
                    border:"none", background:topId===t.id?`${m.cor}15`:"transparent",
                    borderLeft:`3px solid ${topId===t.id?m.cor:"transparent"}`,
                    color:topId===t.id?m.cor:T.textMuted, fontSize:12, cursor:"pointer",
                    fontFamily:T.font, lineHeight:1.4, transition:"all 0.15s",
                  }}>
                    <div style={{ fontWeight:topId===t.id?700:400 }}>{t.titulo}</div>
                    <div style={{ fontSize:10, opacity:0.6, marginTop:1 }}>{t.quizzes.length} questões</div>
                  </button>
                ))}
              </div>
            ))}
          </div>
          {/* Main */}
          <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
            {topAtual && <TopicoView topico={topAtual} cor={modAtual.cor} />}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:40, paddingTop:24, borderTop:`1px solid ${T.border}` }}>
              {ant ? (
                <button onClick={()=>irPara(ant)} style={{ padding:"10px 18px", background:T.card, border:`1px solid ${T.border}`, color:T.textSub, borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:T.font }}>
                  ← {ant.titulo}
                </button>
              ) : <div/>}
              {prox ? (
                <button onClick={()=>irPara(prox)} style={{ padding:"10px 18px", background:modAtual.cor, border:"none", color:"#fff", borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:T.font, fontWeight:700 }}>
                  {prox.titulo} →
                </button>
              ) : <div style={{ fontSize:12, color:T.green, padding:"10px 18px" }}>✓ Conteúdo completo</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
