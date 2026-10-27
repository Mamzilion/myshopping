import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Filter, X, Check, Heart, MapPin, 
  Clock, Phone, MessageCircle, ChevronDown, MoreVertical, 
  Truck, ShieldCheck, Sparkles, ArrowRight, RefreshCw, Eye
} from 'lucide-react';

// ==========================================
// 50 DETAILED FASHION PRODUCTS DATA (FCFA)
// Categories: Vêtements, Chaussures, Accessoires
// ==========================================
const PRODUCTS_DATA = [
  // --- VÊTEMENTS (18 Items) ---
  {
    id: 1,
    name: "Robe Blazer Élégante Dorée",
    category: "Vêtements",
    subcategory: "Robes",
    price: 35000,
    originalPrice: 42000,
    badge: "Best-Seller",
    rating: 4.9,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Blanc Casse", hex: "#F5F5DC" },
      { name: "Noir Intense", hex: "#111111" },
      { name: "Bronze Satiné", hex: "#CD7F32" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    material: "Satin de soie premium & polyester structuré",
    care: "Lavage à sec recommandé. Repassage doux à l'envers.",
    description: "Une coupe moderne et sophistiquée pour vos soirées VIP et réceptions d'affaires. Coutures renforcées et finition dorée aux poignets."
  },
  {
    id: 2,
    name: "Chemise en Lin Respirant Homme",
    category: "Vêtements",
    subcategory: "Chemises",
    price: 18500,
    badge: "Tendance",
    rating: 4.8,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Bleu Ciel", hex: "#87CEEB" },
      { name: "Blanc Pur", hex: "#FFFFFF" },
      { name: "Beige Sable", hex: "#F5F5DC" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 14,
    material: "100% Lin pur bio certifié",
    care: "Lavage en machine à 30°C. Séchage à l'air libre.",
    description: "Parfaite pour le climat chaud. Offre un confort thermique inégalé et une allure décontractée mais raffinée pour vos réunions d'été."
  },
  {
    id: 3,
    name: "Ensemble Boubou Moderne Brodé",
    category: "Vêtements",
    subcategory: "Traditionnel",
    price: 45000,
    originalPrice: 55000,
    badge: "Promo",
    rating: 5.0,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Bleu Royal", hex: "#4169E1" },
      { name: "Vert Émeraude", hex: "#50C878" },
      { name: "Bordeaux Royale", hex: "#800020" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 5,
    material: "Bazin riche de qualité supérieure avec broderie fil d'or",
    care: "Lavage à la main recommandé sans produit chloré.",
    description: "L'alliance parfaite entre tradition et coupe contemporaine. Broderie minutieuse faite à la main par nos maîtres artisans."
  },
  {
    id: 4,
    name: "Veste de Costume Slim Fit Noir",
    category: "Vêtements",
    subcategory: "Costumes",
    price: 42000,
    badge: "Best-Seller",
    rating: 4.7,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Onyx", hex: "#0F0F0F" },
      { name: "Gris Anthracite", hex: "#36454F" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 9,
    material: "Laine peignée & doublure viscose respirante",
    care: "Nettoyage à sec uniquement.",
    description: "Une veste structurée ajustée avec revers en pointe. Idéale pour les mariages, galas et rendez-vous d'affaires décisifs."
  },
  {
    id: 5,
    name: "Jupe Trapeze en Wax Imprimé",
    category: "Vêtements",
    subcategory: "Jupes",
    price: 15000,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 11,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Motif Solaire", hex: "#E67E22" },
      { name: "Motif Océan", hex: "#2980B9" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    material: "100% Coton Wax Vlisco Garanti",
    care: "Lavage à l'eau froide avec des couleurs similaires.",
    description: "Motifs vibrants célébrant le savoir-faire local. Taille haute élastique avec poches latérales invisibles très pratiques."
  },
  {
    id: 6,
    name: "Pantalon Chino Ajusté Beige",
    category: "Vêtements",
    subcategory: "Pantalons",
    price: 19500,
    badge: "Tendance",
    rating: 4.6,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige Safari", hex: "#D2B48C" },
      { name: "Bleu Marine", hex: "#000080" },
      { name: "Vert Olive", hex: "#556B2F" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 15,
    material: "98% Coton, 2% Élasthanne pour une souplesse optimale",
    care: "Lavage en machine à 40°C.",
    description: "Incontournable du vestiaire masculin modernisé. Une touche de stretch pour un confort de mouvement tout au long de la journée."
  },
  {
    id: 7,
    name: "Complet Kimono Wax & Soie",
    category: "Vêtements",
    subcategory: "Sets",
    price: 38000,
    badge: "Nouveau",
    rating: 4.9,
    reviewsCount: 9,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Jaune Moutarde", hex: "#E1AD01" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 6,
    material: "Mélange Wax Premium & Soie artificielle",
    care: "Lavage délicat à la main.",
    description: "Ensemble fluide composé d'un kimono oversized et d'un pantalon fluide assorti. Élégance décontractée garantie."
  },
  {
    id: 8,
    name: "T-Shirt Premium Coton Épais",
    category: "Vêtements",
    subcategory: "T-Shirts",
    price: 9500,
    badge: "Promo",
    rating: 4.5,
    reviewsCount: 50,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Blanc Pur", hex: "#FFFFFF" },
      { name: "Noir Carbone", hex: "#1C1C1C" },
      { name: "Gris Chine", hex: "#BEBEBE" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 30,
    material: "100% Coton Pima 240g/m²",
    care: "Lavage classique à 30°C.",
    description: "Le t-shirt basique parfait qui ne se déforme pas après les lavages. Col renforcé en bord-côte résistant."
  },
  {
    id: 9,
    name: "Robe de Soirée Sirène Pailletée",
    category: "Vêtements",
    subcategory: "Robes",
    price: 68000,
    originalPrice: 80000,
    badge: "Best-Seller",
    rating: 5.0,
    reviewsCount: 17,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Or Étincelant", hex: "#FFD700" },
      { name: "Argent Métal", hex: "#C0C0C0" }
    ],
    sizes: ["S", "M", "L"],
    stock: 3,
    material: "Sequins brodés sur tissu stretch sculptant",
    care: "Nettoyage professionnel chez le pressing.",
    description: "Pour illuminer vos plus grands événements. Moulante jusqu'aux genoux avec une traîne évasée majestueuse."
  },
  {
    id: 10,
    name: "Polo Chic en Maille Piquée",
    category: "Vêtements",
    subcategory: "Polos",
    price: 14000,
    badge: "Tendance",
    rating: 4.7,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1625910513413-5fc2814e3518?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Vert Forêt", hex: "#228B22" },
      { name: "Bleu Nuit", hex: "#191970" },
      { name: "Bordeaux", hex: "#800020" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 18,
    material: "100% Coton peigné piqué",
    care: "Lavage à 30°C.",
    description: "Finition col et manches contrastés. Un look smart casual à porter au bureau comme en week-end."
  },
  {
    id: 11,
    name: "Combinaison Pantalon Cintrée",
    category: "Vêtements",
    subcategory: "Combinaisons",
    price: 29000,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Rouge Rubis", hex: "#E0115F" },
      { name: "Noir Mat", hex: "#222222" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    material: "Crepe de viscose & élasthanne",
    care: "Repassage doux à la vapeur.",
    description: "Une silhouette élancée grâce à sa ceinture dorée amovible et son décolleté en V croisé très flatteur."
  },
  {
    id: 12,
    name: "Short sur Mesure Lin & Coton",
    category: "Vêtements",
    subcategory: "Shorts",
    price: 12500,
    badge: "Promo",
    rating: 4.4,
    reviewsCount: 16,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Khaki Safari", hex: "#F0E68C" },
      { name: "Bleu Denim", hex: "#1560BD" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    material: "Mélange 50% Lin, 50% Coton",
    care: "Lavage standard.",
    description: "Coupe bermuda moderne s'arrêtant juste au-dessus du genou. Idéal pour les sorties estivales décontractées."
  },
  {
    id: 13,
    name: "Manteau Trench Capuchon Mousse",
    category: "Vêtements",
    subcategory: "Manteaux",
    price: 48000,
    badge: "Tendance",
    rating: 4.9,
    reviewsCount: 8,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige Camel", hex: "#C19A6B" },
      { name: "Noir Classique", hex: "#000000" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 4,
    material: "Gabardine imperméable haute densité",
    care: "Nettoyage à sec à privilégier.",
    description: "Protection thermique et imperméable chic pour les saisons fraîches et pluvieuses. Boutons en corne de buffle."
  },
  {
    id: 14,
    name: "Gilet sans Manches Traditionnel",
    category: "Vêtements",
    subcategory: "Gilets",
    price: 22000,
    badge: "Nouveau",
    rating: 4.7,
    reviewsCount: 13,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Motif Kita Gold", hex: "#DAA520" },
      { name: "Motif Bogolan Black", hex: "#333333" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 10,
    material: "Coton tissé main & doublure satin",
    care: "Lavage doux à la main.",
    description: "Ajoutez une touche d'authenticité africaine à vos chemises et t-shirts unis grâce à ce gilet ajusté."
  },
  {
    id: 15,
    name: "Jupe Longue Plissée Satinée",
    category: "Vêtements",
    subcategory: "Jupes",
    price: 21000,
    badge: "Best-Seller",
    rating: 4.8,
    reviewsCount: 25,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Vert Émeraude", hex: "#004B49" },
      { name: "Rose Poudré", hex: "#FFB6C1" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 11,
    material: "Satin de polyester plissé permanent",
    care: "Lavage délicat dans un filet.",
    description: "Mouvement fluide et reflets lumineux à chaque pas. Taille élastiquée dorée s'adaptant à toutes les morphologies."
  },
  {
    id: 16,
    name: "Pull en Maille Légère Col V",
    category: "Vêtements",
    subcategory: "Pulls",
    price: 16500,
    badge: "Promo",
    rating: 4.5,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Blanc Casse", hex: "#FAF0E6" },
      { name: "Gris Souris", hex: "#808080" }
    ],
    sizes: ["M", "L", "XL"],
    stock: 13,
    material: "Coton respirant & fil d'acrilique doux",
    care: "Séchage à plat obligatoire.",
    description: "Légèreté idéale pour les soirées climatisées ou les brises nocturnes. Maille fine très agréable à même la peau."
  },
  {
    id: 17,
    name: "Robe Portefeuille Imprimée Floral",
    category: "Vêtements",
    subcategory: "Robes",
    price: 27500,
    badge: "Tendance",
    rating: 4.9,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Rouge Corail", hex: "#FF7F50" },
      { name: "Bleu Indigo", hex: "#4B0082" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    material: "Viscose 100% naturelle légère",
    care: "Lavage à froid.",
    description: "S'ajuste parfaitement à la taille grâce à son lien croisé. Idéale pour les brunchs du dimanche et anniversaires."
  },
  {
    id: 18,
    name: "Blazer Femme Cintrée Chic",
    category: "Vêtements",
    subcategory: "Costumes",
    price: 33000,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1548624149-f1af3482b703?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Blanc Pur", hex: "#FFFFFF" },
      { name: "Rose Bonbon", hex: "#FF69B4" }
    ],
    sizes: ["S", "M", "L"],
    stock: 7,
    material: "Polyester premium & élasthanne avec épaulettes structurées",
    care: "Lavage à sec.",
    description: "Apporte une carrure professionnelle élégante. Poches à rabat ornées de boutons dorés gravés."
  },

  // --- CHAUSSURES (16 Items) ---
  {
    id: 19,
    name: "Escarpins Talon Aiguille Vernis",
    category: "Chaussures",
    subcategory: "Talons",
    price: 28000,
    originalPrice: 35000,
    badge: "Best-Seller",
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Rouge Passion", hex: "#FF0000" },
      { name: "Noir Vernis", hex: "#0A0A0A" },
      { name: "Nude Chair", hex: "#E3A857" }
    ],
    sizes: ["37", "38", "39", "40", "41"],
    stock: 10,
    material: "Cuir vernis synthétique de luxe & semelle confort rembourrée",
    care: "Nettoyer avec un chiffon doux humide.",
    description: "Hauteur de talon 10cm équilibrée. Conçus avec un coussinet intérieur en gel pour amortir chaque pas lors de vos soirées."
  },
  {
    id: 20,
    name: "Mocassins Homme Cuir Artisanal",
    category: "Chaussures",
    subcategory: "Mocassins",
    price: 32000,
    badge: "Tendance",
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Marron Cognac", hex: "#9A463D" },
      { name: "Noir Cuir", hex: "#1A1A1A" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 12,
    material: "100% Cuir véritable de bovin tanné localement",
    care: "Cirage régulier avec de la crème pour cuir.",
    description: "Mocassins faits à la main par nos artisans maroquiniers. Souplesse extrême dès le premier essayage."
  },
  {
    id: 21,
    name: "Sneakers Streetwear Urban Gold",
    category: "Chaussures",
    subcategory: "Baskets",
    price: 26000,
    originalPrice: 30000,
    badge: "Promo",
    rating: 4.7,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Blanc & Doré", hex: "#FFD700" },
      { name: "Blanc & Noir", hex: "#000000" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 16,
    material: "Cuir microfibre respirant & semelle alvéolée en caoutchouc",
    care: "Brossage doux avec nettoyant baskets.",
    description: "Design urbain très prisé. Semelle épaisse offrant un amorti maximal et un style streetwear incomparable."
  },
  {
    id: 22,
    name: "Sandales Nu-Pieds en Cuir Doré",
    category: "Chaussures",
    subcategory: "Sandales",
    price: 16000,
    badge: "Nouveau",
    rating: 4.6,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Or Brillant", hex: "#D4AF37" },
      { name: "Argent Métal", hex: "#C0C0C0" }
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: 14,
    material: "Cuir véritable tressé & lanières dorées",
    care: "Éviter l'immersion prolongée dans l'eau.",
    description: "Légères, chics et faciles à enfiler. Idéales pour sublimer vos tenues estivales et robes fluides."
  },
  {
    id: 23,
    name: "Chaussures Richelieu Classiques",
    category: "Chaussures",
    subcategory: "Ville",
    price: 39000,
    badge: "Best-Seller",
    rating: 5.0,
    reviewsCount: 20,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Marron Foncé Patiné", hex: "#4A2E2B" },
      { name: "Noir Onyx", hex: "#111111" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 8,
    material: "Cuir pleine fleur cousu Goodyear",
    care: "Utiliser des embauchoirs en bois après chaque port.",
    description: "L'excellence de la chaussure de cérémonie masculine. Finition patinée à la main pour une pièce unique."
  },
  {
    id: 24,
    name: "Mules à Talon Carré Tressées",
    category: "Chaussures",
    subcategory: "Talons",
    price: 22500,
    badge: "Tendance",
    rating: 4.7,
    reviewsCount: 23,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Vert Pistache", hex: "#93C572" },
      { name: "Blanc Crème", hex: "#FFFDD0" },
      { name: "Noir Mat", hex: "#1C1C1C" }
    ],
    sizes: ["37", "38", "39", "40", "41"],
    stock: 11,
    material: "Cuir synthétique souple tressé à la main",
    care: "Essuyer avec une éponge légèrement humide.",
    description: "Talon carré stable de 6cm. Un confort absolu pour rester debout lors de vos cocktails et cérémonies."
  },
  {
    id: 25,
    name: "Bottines en Daim Homme Chelsea",
    category: "Chaussures",
    subcategory: "Bottines",
    price: 36000,
    originalPrice: 42000,
    badge: "Promo",
    rating: 4.8,
    reviewsCount: 17,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Tabac / Taupe", hex: "#8B5A2B" },
      { name: "Noir Daim", hex: "#222222" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 7,
    material: "Cuir suédé véritable & élastiques latéraux renforcés",
    care: "Imperméabiliser avant la première utilisation.",
    description: "Style intemporel s'accordant aussi bien avec un jean brut qu'un pantalon de costume ajusté."
  },
  {
    id: 26,
    name: "Babouches Royales Brodées",
    category: "Chaussures",
    subcategory: "Mocassins",
    price: 18000,
    badge: "Nouveau",
    rating: 4.9,
    reviewsCount: 30,
    image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Doré Traditionnel", hex: "#FFD700" },
      { name: "Bleu Nuit Brodé", hex: "#000080" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    stock: 15,
    material: "Cuir d'agneau ultra-doux & broderies en fils de soie",
    care: "Nettoyage à sec spécial cuir.",
    description: "Chaussures traditionnelles de prestige, indispensables pour accompagner vos tenues de grands jours."
  },
  {
    id: 27,
    name: "Baskets Sport Performance Flex",
    category: "Chaussures",
    subcategory: "Baskets",
    price: 24000,
    badge: "Tendance",
    rating: 4.5,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Rouge / Noir", hex: "#D32F2F" },
      { name: "Gris / Néon", hex: "#757575" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    stock: 20,
    material: "Tissu Flyknit ultra-respirant & semelle à air compressé",
    care: "Lavage en machine cycle froid sous filet.",
    description: "Confort extrême pour le sport ou la marche quotidienne intense. Légèreté exceptionnelle sous le pied."
  },
  {
    id: 28,
    name: "Compensées en Raphia Tissé",
    category: "Chaussures",
    subcategory: "Talons",
    price: 23000,
    badge: "Nouveau",
    rating: 4.7,
    reviewsCount: 12,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige Raphia", hex: "#E5D3B3" },
      { name: "Noir Raphia", hex: "#333333" }
    ],
    sizes: ["37", "38", "39", "40"],
    stock: 9,
    material: "Raphia naturel tressé main & semelle en corde et caoutchouc",
    care: "Nettoyer avec une brosse à poils doux.",
    description: "Sublimez vos chevilles avec ce modèle compensé stable et très chic pour les réceptions en plein air."
  },
  {
    id: 29,
    name: "Sandales Cuir Homme Croisées",
    category: "Chaussures",
    subcategory: "Sandales",
    price: 17500,
    badge: "Best-Seller",
    rating: 4.8,
    reviewsCount: 36,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Marron Chocolat", hex: "#3D2314" },
      { name: "Noir Mat", hex: "#111111" }
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    stock: 18,
    material: "Brides en cuir véritable épaisses & semelle ergonomique",
    care: "Appliquer du baume pour cuir 1 fois par mois.",
    description: "Le summum du confort masculin pour les journées chaudes. S'accorde parfaitement avec les boubous et tenues décontractées."
  },
  {
    id: 30,
    name: "Bottines Compensées Femme Chic",
    category: "Chaussures",
    subcategory: "Bottines",
    price: 34000,
    badge: "Promo",
    rating: 4.6,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Daim", hex: "#1A1A1A" },
      { name: "Marron Camel", hex: "#A0522D" }
    ],
    sizes: ["37", "38", "39", "40"],
    stock: 6,
    material: "Cuir suédé synthétique & fermoir éclair intérieur gold",
    care: "Brosser doucement avec une brosse à daim.",
    description: "Un look moderne et affirmé. Talon compensé de 8cm assurant une stabilité optimale toute la journée."
  },
  {
    id: 31,
    name: "Chaussettes Hautes en Coton Bio (Pack de 3)",
    category: "Chaussures",
    subcategory: "Accessoires Pieds",
    price: 6500,
    badge: "Nouveau",
    rating: 4.9,
    reviewsCount: 40,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Trio Noir/Gris/Blanc", hex: "#555555" }
    ],
    sizes: ["Standard (39-44)"],
    stock: 50,
    material: "85% Coton Bio, 12% Polyamide, 3% Élasthanne",
    care: "Lavage en machine à 40°C.",
    description: "Anti-transpiration et renforcement au niveau du talon et de la pointe pour durer dans le temps."
  },
  {
    id: 32,
    name: "Chaussures Derby en Cuir Vernis",
    category: "Chaussures",
    subcategory: "Ville",
    price: 37000,
    badge: "Tendance",
    rating: 4.8,
    reviewsCount: 11,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Miroir", hex: "#000000" },
      { name: "Bordeaux Profond", hex: "#4A0E17" }
    ],
    sizes: ["40", "41", "42", "43", "44"],
    stock: 7,
    material: "Cuir vernis haute brillance",
    care: "Essuyer avec un chiffon en microfibre doux.",
    description: "Lacet ciré fin et œillets métalliques discreetement intégrés. Pour le gentleman raffiné."
  },
  {
    id: 33,
    name: "Claquettes Design Luxe Unisexe",
    category: "Chaussures",
    subcategory: "Sandales",
    price: 13500,
    badge: "Best-Seller",
    rating: 4.7,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir & Logo Or", hex: "#000000" },
      { name: "Blanc & Logo Or", hex: "#FFFFFF" }
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 25,
    material: "Mousse EVA moulée & bride en cuir matelassé",
    care: "Lavage à l'eau savonneuse.",
    description: "Confort absolu pour vos moments de détente à la maison ou à la piscine du resort."
  },
  {
    id: 34,
    name: "Escarpins Slingback à Bride Arrière",
    category: "Chaussures",
    subcategory: "Talons",
    price: 29500,
    badge: "Nouveau",
    rating: 4.9,
    reviewsCount: 10,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige & Bout Noir", hex: "#F5F5DC" },
      { name: "Rouge Rubis", hex: "#990000" }
    ],
    sizes: ["37", "38", "39", "40"],
    stock: 8,
    material: "Cuir d'agneau souple & boucle dorée ajustée",
    care: "Protéger du contact direct avec l'huile.",
    description: "Bout amande tendance avec bride réglable. L'atout chic irrésistible de la saison."
  },

  // --- ACCESSOIRES (16 Items) ---
  {
    id: 35,
    name: "Sac à Main Cuir Crocodile Gold",
    category: "Accessoires",
    subcategory: "Sacs",
    price: 32000,
    originalPrice: 40000,
    badge: "Best-Seller",
    rating: 5.0,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Vert Croco", hex: "#1B4D3E" },
      { name: "Noir Croco", hex: "#000000" },
      { name: "Marron Caramel", hex: "#C86D51" }
    ],
    sizes: ["Taille Unique"],
    stock: 9,
    material: "Cuir PU relief crocodile & fermoir plaqué or",
    care: "Ranger dans son pochon de protection en tissu.",
    description: "Structure rigide avec bandoulière amovible en chaîne dorée. Intérieur spacieux avec double compartiment zippé."
  },
  {
    id: 36,
    name: "Montre Homme Chronographe Luxe",
    category: "Accessoires",
    subcategory: "Montres",
    price: 45000,
    originalPrice: 55000,
    badge: "Tendance",
    rating: 4.9,
    reviewsCount: 27,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Or & Cadran Bleu", hex: "#000080" },
      { name: "Argent & Cadran Noir", hex: "#1C1C1C" }
    ],
    sizes: ["Ajustable"],
    stock: 6,
    material: "Acier inoxydable 316L & verre en cristal de saphir anti-rayures",
    care: "Étanche jusqu'à 50m (5 ATM).",
    description: "Mouvement à quartz japonais de haute précision avec affichage de la date et chronomètre à cadran triple."
  },
  {
    id: 37,
    name: "Ceinture Cuir Homme Reversible",
    category: "Accessoires",
    subcategory: "Ceintures",
    price: 14000,
    badge: "Best-Seller",
    rating: 4.8,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir / Marron (2-en-1)", hex: "#2B1B17" }
    ],
    sizes: ["Standard (110cm - 125cm)"],
    stock: 22,
    material: "100% Cuir de vachette véritable avec boucle pivotante rotative",
    care: "Nettoyer avec un chiffon sec.",
    description: "Passez du noir au marron en un tour de main grâce à la boucle rotative en métal brossé sans défaire la ceinture."
  },
  {
    id: 38,
    name: "Lunettes de Soleil Oversized Luxe",
    category: "Accessoires",
    subcategory: "Lunettes",
    price: 16500,
    badge: "Nouveau",
    rating: 4.7,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Écaille de Tortue", hex: "#8B4513" },
      { name: "Noir Intense UV400", hex: "#000000" }
    ],
    sizes: ["Taille Unique"],
    stock: 15,
    material: "Monture en acétate fait main & verres polarisés UV400 cat. 3",
    care: "Nettoyer avec la chamoisine fournie dans l'étui rigide.",
    description: "Protections solaires complètes contre les UV tropicaux. Style glamour inspiré des défilés de mode."
  },
  {
    id: 39,
    name: "Sac Cabas XL Wax & Cuir",
    category: "Accessoires",
    subcategory: "Sacs",
    price: 24000,
    badge: "Promo",
    rating: 4.9,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Imprimé Solaire", hex: "#D4AF37" },
      { name: "Imprimé Indigo", hex: "#2B3A42" }
    ],
    sizes: ["Grand Format"],
    stock: 10,
    material: "Tissu Wax hollandais doublé canvas & anses en cuir véritable",
    care: "Lavage des zones en tissu avec éponge douce.",
    description: "Le compagnon idéal de vos journées bien chargées ou escapades du week-end. Capacité généreuse pour ordinateur portable."
  },
  {
    id: 40,
    name: "Parure Collier & Boucles Dorées",
    category: "Accessoires",
    subcategory: "Bijoux",
    price: 19500,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 16,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Plaqué Or 18K", hex: "#FFD700" }
    ],
    sizes: ["Ajustable"],
    stock: 12,
    material: "Acier inoxydable plaqué or 18 carats 3 microns hypoallergénique",
    care: "Éviter le contact direct avec le parfum et les détergents.",
    description: "Un ensemble lumineux qui ne rouille pas et ne verdit pas au contact de la peau ou de la transpiration."
  },
  {
    id: 41,
    name: "Chapeau Fedora en Feutre Laine",
    category: "Accessoires",
    subcategory: "Chapeaux",
    price: 18500,
    badge: "Tendance",
    rating: 4.6,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Onyx", hex: "#111111" },
      { name: "Camel Élégant", hex: "#C19A6B" }
    ],
    sizes: ["M (56-58cm)", "L (58-60cm)"],
    stock: 8,
    material: "100% Feutre de laine naturelle & ruban en gros-grain",
    care: "Brosser délicatement avec une brosse à vêtements.",
    description: "Apporte immédiatement une touche de charisme et de sophistication à n'importe quelle tenue."
  },
  {
    id: 42,
    name: "Pochette de Soirée Métallisée Gold",
    category: "Accessoires",
    subcategory: "Sacs",
    price: 17000,
    badge: "Best-Seller",
    rating: 4.9,
    reviewsCount: 35,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Or Miroir", hex: "#FFD700" },
      { name: "Argent Strass", hex: "#E0E0E0" }
    ],
    sizes: ["Taille Unique"],
    stock: 14,
    material: "Coque rigide en métal sculpté & doublure velours",
    care: "Chiffon sec doux.",
    description: "Le bijou de sac indispensable pour vos mariages et galas. Peut se porter à la main ou à l'épaule."
  },
  {
    id: 43,
    name: "Portefeuille Homme Cuir Compact",
    category: "Accessoires",
    subcategory: "Petite Maroquinerie",
    price: 11000,
    badge: "Promo",
    rating: 4.7,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Marron Vintage", hex: "#5C4033" },
      { name: "Noir Surpiqué", hex: "#111111" }
    ],
    sizes: ["Format Poche"],
    stock: 20,
    material: "Cuir de vêtement pleine fleur avec protection anti-piratage RFID",
    care: "Cirage neutre occasionnel.",
    description: "Comprend 8 emplacements pour cartes, un compartiment pour billets FCFA et une fenêtre transparente pour carte d'identité."
  },
  {
    id: 44,
    name: "Foulard en Soie Imprimé Royal",
    category: "Accessoires",
    subcategory: "Foulards",
    price: 12500,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Bleu & Or Motifs Baroques", hex: "#1D2951" },
      { name: "Rouge & Doré", hex: "#8B0000" }
    ],
    sizes: ["90cm x 90cm"],
    stock: 16,
    material: "100% Soie naturelle roulottée main",
    care: "Lavage à froid à la main avec du shampoing doux.",
    description: "Multi-usages : à porter autour du cou, dans les cheveux, ou noué à la poignée de votre sac à main préféré."
  },
  {
    id: 45,
    name: "Bracelet Homme Perles de Lave & Or",
    category: "Accessoires",
    subcategory: "Bijoux",
    price: 9000,
    badge: "Tendance",
    rating: 4.6,
    reviewsCount: 21,
    image: "https://images.unsplash.com/photo-1611591475179-42031764cbc3?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Pierre & Charm Doré", hex: "#333333" }
    ],
    sizes: ["Élastique Extensible"],
    stock: 25,
    material: "Pierres volcaniques naturelles de lave & couronne en laiton doré",
    care: "Ne pas immerger sous l'eau de mer.",
    description: "Apporte une touche masculine sobre et distinguée au poignet. S'associe parfaitement à une montre en acier."
  },
  {
    id: 46,
    name: "Casquette Premium Suede Minimaliste",
    category: "Accessoires",
    subcategory: "Chapeaux",
    price: 10500,
    badge: "Promo",
    rating: 4.5,
    reviewsCount: 30,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Mat", hex: "#111111" },
      { name: "Beige Daim", hex: "#E5D3B3" }
    ],
    sizes: ["Ajustable par Sangle"],
    stock: 18,
    material: "Faux suède doux toucher velours & fermoir métallique",
    care: "Brossage doux à sec.",
    description: "Casquette structurée 6 panneaux sans logo ostentatoire pour un style streetwear élégant et épuré."
  },
  {
    id: 47,
    name: "Boutons de Manchette Dorés Sculptés",
    category: "Accessoires",
    subcategory: "Bijoux",
    price: 11500,
    badge: "Nouveau",
    rating: 4.9,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Or Jaune 18K", hex: "#FFD700" }
    ],
    sizes: ["Taille Standard"],
    stock: 10,
    material: "Laiton massif plaqué or résistant à la corrosion",
    care: "Conserver dans son coffret en suédine.",
    description: "La touche finale ultime pour vos chemises à poignets mousquetaires lors des grands évènements."
  },
  {
    id: 48,
    name: "Ceinture Corset Femme Ajustable",
    category: "Accessoires",
    subcategory: "Ceintures",
    price: 13000,
    badge: "Tendance",
    rating: 4.7,
    reviewsCount: 17,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Intense", hex: "#000000" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    sizes: ["S/M", "L/XL"],
    stock: 11,
    material: "Cuir PU souple & élastique large renforcé avec lacets",
    care: "Essuyer avec un tissu microfibre.",
    description: "Sculpte la taille par-dessus une chemise oversize ou une robe fluide pour marquer la silhouette."
  },
  {
    id: 49,
    name: "Eventail Artisanal Bois & Wax",
    category: "Accessoires",
    subcategory: "Accessoires Divers",
    price: 7500,
    badge: "Best-Seller",
    rating: 4.8,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Wax Solaire", hex: "#E67E22" },
      { name: "Wax Fleur d'Oranger", hex: "#D4AF37" }
    ],
    sizes: ["Taille Unique"],
    stock: 35,
    material: "Bois de santal poli & tissu Wax véritable imprimé",
    care: "Refermer doucement après utilisation.",
    description: "Pratique et ultra élégant pour vous rafraîchir en toute discrétion lors des mariages ou messe du dimanche."
  },
  {
    id: 50,
    name: "Sac Banane Cuir Premium Unisex",
    category: "Accessoires",
    subcategory: "Sacs",
    price: 18500,
    badge: "Nouveau",
    rating: 4.8,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Noir Cuir Graine", hex: "#1A1A1A" },
      { name: "Marron Cognac", hex: "#9A463D" }
    ],
    sizes: ["Ajustable"],
    stock: 13,
    material: "100% Cuir véritable grainé & zip métallique robuste",
    care: "Appliquer un soin nourrissant cuir.",
    description: "Se porte en bandoulière croisée sur la poitrine ou à la ceinture. Pratique pour garder votre téléphone et portefeuille en sécurité."
  }
];

// Helper to format currency in FCFA (XAF)
const formatPrice = (amount) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + " FCFA";
};

// Main App Component
export default function App() {
  // Splash & Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBadgeFilter, setActiveBadgeFilter] = useState('Tous');
  const [priceRange, setPriceRange] = useState(80000);

  // Cart & UI states
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  // Delivery options state for Checkout
  const [fulfillmentMethod, setFulfillmentMethod] = useState('delivery'); // 'delivery' or 'pickup'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Initial loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Ambient Canvas Particles Animation Effect
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create soft ambient floating particles
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? 'rgba(197, 155, 39, 0.15)' : 'rgba(212, 175, 55, 0.08)',
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // IntersectionObserver for Scroll Animations
  useEffect(() => {
    if (isLoading) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading, selectedCategory, searchQuery, activeBadgeFilter]);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const itemColor = selectedColor || product.colors[0].name;
    const itemSize = selectedSize || product.sizes[0];
    const cartItemId = `${product.id}-${itemColor}-${itemSize}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          selectedColor: itemColor,
          selectedSize: itemSize,
          quantity
        }
      ];
    });

    showToast(`"${product.name}" ajouté au panier !`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast("Article retiré du panier");
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products strictly based on search, category, badge and price
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBadge =
      activeBadgeFilter === 'Tous' || product.badge === activeBadgeFilter;
    const matchesPrice = product.price <= priceRange;

    return matchesCategory && matchesSearch && matchesBadge && matchesPrice;
  });

  // Generate WhatsApp Message for Cart Checkout
  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let text = `Bonjour Luxe & Style Local ! 👋\nJe souhaite passer la commande suivante :\n\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}*\n   - Couleurs: ${item.selectedColor}\n   - Taille: ${item.selectedSize}\n   - Quantité: ${item.quantity}\n   - Prix: ${formatPrice(item.price * item.quantity)}\n\n`;
    });

    text += `*TOTAL COMMANDE: ${formatPrice(cartTotal)}*\n\n`;
    text += `*Mode de récupération:* ${fulfillmentMethod === 'delivery' ? 'Livraison à domicile 🚚' : 'Retrait en Boutique 🛍️'}\n`;
    if (fulfillmentMethod === 'delivery' && deliveryAddress) {
      text += `*Adresse de livraison:* ${deliveryAddress}\n`;
    }
    if (customerName) text += `*Nom du client:* ${customerName}\n`;
    if (customerPhone) text += `*Téléphone:* ${customerPhone}\n`;

    text += `\nMerci de me confirmer la disponibilité et les modalités de paiement (Orange Money / MTN MoMo).`;

    const encodedText = encodeURIComponent(text);
    // WhatsApp Direct Link (using generic international local format example)
    window.open(`https://wa.me/237600000000?text=${encodedText}`, '_blank');
  };

  // Direct Single Product WhatsApp Order
  const handleDirectWhatsAppProduct = (product, color, size) => {
    const text = `Bonjour Luxe & Style Local ! 👋\nJe souhaite commander immédiatement cet article :\n\n*Article:* ${product.name}\n*Prix:* ${formatPrice(product.price)}\n*Couleur choisie:* ${color}\n*Taille choisie:* ${size}\n\nMerci de me donner la procédure de validation.`;
    window.open(`https://wa.me/237600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] font-sans relative selection:bg-[#C59B27] selection:text-white overflow-x-hidden">
      
      {/* Dynamic Ambient Particles Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* OPENING ENTRANCE ANIMATION SPLASH */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#111827] text-white flex flex-col items-center justify-center animate-fadeOut">
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-3xl font-serif tracking-widest text-[#D4AF37] animate-pulse">
              LUXE & STYLE
            </div>
            <p className="text-xs tracking-widest text-gray-400 mt-2 uppercase">
              Mode • Chaussures • Accessoires
            </p>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C59B27]/40 animate-bounce">
          <Check className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategory('Tous')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#111827] to-[#374151] flex items-center justify-center text-[#D4AF37] font-bold text-xl shadow-md border border-[#C59B27]/30">
              L
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] leading-none tracking-tight">
                Luxe & Style <span className="text-[#C59B27]">Local</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wider uppercase mt-1">
                Boutique de Mode & Accessoires
              </p>
            </div>
          </div>

          {/* Search Bar - Responsive */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              placeholder="Rechercher par vêtements, chaussures, accessoires..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/80 border border-gray-300 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center"
              aria-label="Panier"
            >
              <ShoppingBag className="w-6 h-6 text-[#111827]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C59B27] text-white text-xs font-bold rounded-full h-5.5 w-5.5 flex items-center justify-center border-2 border-white shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 3-Dots Menu Dropdown Button (...) */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-full hover:bg-gray-100 text-gray-800 transition-colors border border-gray-200"
                aria-label="Menu d'informations"
              >
                <MoreVertical className="w-6 h-6" />
              </button>

              {/* 3-Dots Menu Dropdown Drawer */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 px-5 z-50 text-sm animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <span className="font-semibold text-gray-900">Infos & Contact Boutique</span>
                    <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Store Hours */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Horaires d'ouverture</p>
                        <p className="text-xs text-gray-500">Lun - Sam: 08h30 - 20h00</p>
                        <p className="text-xs text-gray-500">Dimanche: 13h00 - 18h00</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Localisation Boutique</p>
                        <p className="text-xs text-gray-500">Avenue de la Mode, Face Galerie Commerciale</p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Paiements Acceptés</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[10px] font-bold rounded">Orange Money</span>
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded">MTN MoMo</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[10px] font-bold rounded">Espèces</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick WhatsApp Contact */}
                    <div className="pt-2">
                      <a
                        href="https://wa.me/237600000000"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-xs"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Discuter directement sur WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher vêtements, chaussures, accessoires..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION WITH ENTRANCE ANIMATION */}
      <section className="relative bg-[#111827] text-white py-16 md:py-24 overflow-hidden scroll-reveal opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 me-2 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Collection Tendance 2026
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              L'Élégance de la Mode & Accessoires <span className="text-[#D4AF37]">Haute Qualité</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              Découvrez plus de 50 articles uniques spécialement choisis pour vous : Vêtements raffinés, Chaussures de prestige et Accessoires faits pour durer.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  setSelectedCategory('Tous');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="bg-[#C59B27] hover:bg-[#b08820] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-amber-900/20 flex items-center gap-2 text-sm"
              >
                Explorer la Collection <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY & FILTER NAVIGATION */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur border-b border-gray-200 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Focused Categories: Vêtements, Chaussures, Accessoires */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2">
              {['Tous', 'Vêtements', 'Chaussures', 'Accessoires'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-[#111827] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Badge Filter Pills */}
            <div className="hidden lg:flex items-center gap-2 border-l border-gray-200 pl-4">
              <span className="text-xs text-gray-400 font-medium">Filtre rapide:</span>
              {['Tous', 'Best-Seller', 'Promo', 'Tendance', 'Nouveau'].map((badge) => (
                <button
                  key={badge}
                  onClick={() => setActiveBadgeFilter(badge)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeBadgeFilter === badge
                      ? 'bg-[#C59B27] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID SECTION WITH SCROLL REVEAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Results Counter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">
              {selectedCategory === 'Tous' ? 'Toutes les Créations' : selectedCategory}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredProducts.length} article(s) disponible(s) en boutique
            </p>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
            <Filter className="w-4 h-4 text-[#C59B27]" />
            <span className="text-xs text-gray-600 whitespace-nowrap font-medium">Prix Max:</span>
            <input
              type="range"
              min="5000"
              max="80000"
              step="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="accent-[#C59B27] w-28 sm:w-36 cursor-pointer"
            />
            <span className="text-xs font-bold text-gray-900 min-w-[75px]">
              {formatPrice(priceRange)}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8 my-8">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-gray-800">Aucun article trouvé</h4>
            <p className="text-sm text-gray-500 mt-1">
              Essayez de modifier votre recherche ou d'élargir le filtre de prix.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
                setActiveBadgeFilter('Tous');
                setPriceRange(80000);
              }}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#C59B27] hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Dynamic 50 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);

            return (
              <div
                key={product.id}
                className="scroll-reveal opacity-0 translate-y-10 transition-all duration-700 ease-out bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
              >
                {/* Image Container */}
                <div className="relative aspect-4/5 bg-gray-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                    product.badge === 'Best-Seller' ? 'bg-[#111827] text-white' :
                    product.badge === 'Promo' ? 'bg-red-600 text-white' :
                    product.badge === 'Tendance' ? 'bg-[#C59B27] text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {product.badge}
                  </span>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-700 hover:text-red-500 transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-gray-900 text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" /> Aperçu rapide
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                    {product.subcategory}
                  </div>
                  <h4 
                    onClick={() => setSelectedProduct(product)}
                    className="font-semibold text-gray-900 line-clamp-1 hover:text-[#C59B27] cursor-pointer transition-colors text-sm"
                  >
                    {product.name}
                  </h4>

                  {/* Color Swatch Previews */}
                  <div className="flex items-center gap-1.5 my-2">
                    {product.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">
                      {product.colors.length} coul.
                    </span>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product, product.colors[0].name, product.sizes[0])}
                      className="bg-gray-900 hover:bg-[#C59B27] text-white p-2.5 rounded-xl transition-colors duration-200"
                      aria-label="Ajouter au panier"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* DETAILED PRODUCT MODAL */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onDirectWhatsApp={handleDirectWhatsAppProduct}
        />
      )}

      {/* SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 bg-[#111827] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif font-bold text-lg">Votre Panier</h3>
                  <span className="text-xs bg-[#C59B27] text-white font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">Votre panier est vide</p>
                    <p className="text-xs text-gray-400 mt-1">Ajoutez des vêtements, chaussures ou accessoires !</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200/80 relative"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="text-xs text-gray-500 mt-0.5 space-x-2">
                            <span>Couleur: <strong>{item.selectedColor}</strong></span>
                            <span>•</span>
                            <span>Taille: <strong>{item.selectedSize}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg text-xs"
                            >
                              -
                            </button>
                            <span className="px-2.5 text-xs font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg text-xs"
                            >
                              +
                            </button>
                          </div>

                          <div className="font-bold text-sm text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Settings & WhatsApp Trigger */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
                  
                  {/* Fulfillment Option */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Mode de réception
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFulfillmentMethod('delivery')}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                          fulfillmentMethod === 'delivery'
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" /> Livraison
                      </button>
                      <button
                        type="button"
                        onClick={() => setFulfillmentMethod('pickup')}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                          fulfillmentMethod === 'pickup'
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" /> Retrait Boutique
                      </button>
                    </div>
                  </div>

                  {/* Customer Inputs */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                    />
                    {fulfillmentMethod === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Adresse précise de livraison"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#C59B27]"
                      />
                    )}
                  </div>

                  {/* Summary & Submit */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600 text-sm font-medium">Total Commande</span>
                      <span className="text-xl font-extrabold text-gray-900">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Valider la commande sur WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#111827] text-gray-300 border-t border-gray-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
            <div>
              <h4 className="text-lg font-serif font-bold text-white mb-3">
                Luxe & Style <span className="text-[#D4AF37]">Local</span>
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Votre référence locale pour les vêtements, chaussures et accessoires de mode haut de gamme.
              </p>
            </div>

            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Categories Principales
              </h5>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => setSelectedCategory('Vêtements')} className="hover:text-[#D4AF37]">Vêtements Homme & Femme</button></li>
                <li><button onClick={() => setSelectedCategory('Chaussures')} className="hover:text-[#D4AF37]">Chaussures & Escarpins</button></li>
                <li><button onClick={() => setSelectedCategory('Accessoires')} className="hover:text-[#D4AF37]">Accessoires, Sacs & Bijoux</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Contact & Paiements
              </h5>
              <p className="text-xs text-gray-400 mb-2">Service client direct via WhatsApp 7j/7.</p>
              <div className="flex gap-2">
                <span className="bg-orange-900/50 text-orange-300 border border-orange-700/50 text-[10px] px-2 py-1 rounded">Orange Money</span>
                <span className="bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 text-[10px] px-2 py-1 rounded">MTN MoMo</span>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-gray-500">
            © 2026 Luxe & Style Local. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: PRODUCT DETAIL MODAL
// ==========================================
function ProductDetailModal({ product, onClose, onAddToCart, onDirectWhatsApp }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 my-8 border border-gray-100 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur p-2 rounded-full text-gray-600 hover:text-black shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-gray-100 aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#111827] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          </div>

          {/* Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#C59B27] uppercase tracking-wider">
                {product.category} • {product.subcategory}
              </span>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-extrabold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Couleur: <span className="text-[#C59B27]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        selectedColor === c.name
                          ? 'border-gray-900 ring-2 ring-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Taille Choisie: <span className="text-gray-900">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t border-b border-gray-100 py-3 my-4 space-y-2 text-xs text-gray-600">
                <p><strong>Composition/Matière:</strong> {product.material}</p>
                <p><strong>Entretien:</strong> {product.care}</p>
                <p><strong>Stock en Boutique:</strong> {product.stock} pièces disponibles</p>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-sm rounded-l-xl font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-sm text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-sm rounded-r-xl font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, selectedColor, selectedSize, quantity);
                    onClose();
                  }}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> Ajouter au Panier
                </button>
              </div>

              <button
                onClick={() => onDirectWhatsApp(product, selectedColor, selectedSize)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Commander Directement via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}