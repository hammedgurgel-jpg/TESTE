export interface FeaturedProject {
  title: string;
  description: string;
  alt: string;
  placeholderLabel: string;
}

export interface GalleryProject {
  slug: string;
  category: string;
  alt: string;
  placeholderLabel: string;
}

export const featuredProject: FeaturedProject = {
  title: 'Edifício comercial — Petrolina/PE',
  description:
    'Projeto de prevenção e combate a incêndio para edificação comercial de múltiplos pavimentos, do dimensionamento técnico à aprovação junto ao Corpo de Bombeiros.',
  alt: 'Imagem ilustrativa (placeholder) de edifício comercial com projeto de prevenção e combate a incêndio da Ancile',
  placeholderLabel: 'Imagem ilustrativa — em breve',
};

export const galleryProjects: GalleryProject[] = [
  {
    slug: 'projeto-industrial',
    category: 'Projeto industrial',
    alt: 'Imagem ilustrativa (placeholder) de galpão industrial com projeto de prevenção e combate a incêndio',
    placeholderLabel: 'Placeholder',
  },
  {
    slug: 'condominio-residencial',
    category: 'Condomínio residencial',
    alt: 'Imagem ilustrativa (placeholder) de condomínio residencial com regularização de AVCB/CLCB',
    placeholderLabel: 'Placeholder',
  },
  {
    slug: 'vistoria-tecnica',
    category: 'Vistoria técnica',
    alt: 'Imagem ilustrativa (placeholder) de vistoria técnica em edificação comercial',
    placeholderLabel: 'Placeholder',
  },
  {
    slug: 'laudo-avcb',
    category: 'Laudo e AVCB',
    alt: 'Imagem ilustrativa (placeholder) de emissão de laudo técnico e AVCB/CLCB',
    placeholderLabel: 'Placeholder',
  },
];
