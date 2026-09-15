export interface Service {
  slug: string;
  name: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: 'projeto-de-incendio',
    name: 'Projeto de incêndio',
    description:
      'Projeto técnico de prevenção e combate a incêndio de uma edificação, elaborado para aprovação junto ao Corpo de Bombeiros.',
  },
  {
    slug: 'laudo-tecnico',
    name: 'Laudo técnico',
    description:
      'Documento técnico assinado por engenheiro habilitado que atesta a conformidade (ou não) de uma edificação a normas de segurança contra incêndio.',
  },
  {
    slug: 'avcb-clcb',
    name: 'AVCB/CLCB',
    description:
      'Auto de Vistoria do Corpo de Bombeiros (AVCB) e Certificado de Licença do Corpo de Bombeiros (CLCB) — obtenção e renovação junto ao Corpo de Bombeiros.',
  },
  {
    slug: 'consultoria-regularizacao',
    name: 'Consultoria/regularização',
    description:
      'Orientação e acompanhamento para adequar uma edificação às exigências do Corpo de Bombeiros, incluindo regularização de pendências.',
  },
  {
    slug: 'vistoria',
    name: 'Vistoria',
    description:
      'Inspeção técnica presencial de uma edificação para verificar sua conformidade com o projeto e as normas de segurança contra incêndio.',
  },
];
