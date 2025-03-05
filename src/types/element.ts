import React from 'react';

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category: ElementCategory;
  electronConfiguration: string;
  electronegativity?: number;
  atomicRadius?: number;
  ionizationEnergy?: number;
  density?: number;
  meltingPoint?: number;
  boilingPoint?: number;
  discoveredBy?: string;
  yearDiscovered?: number;
  description: string;
  electrons: number[];
}

export enum ElementCategory {
  AlkaliMetal = "alkali-metal",
  AlkalineEarthMetal = "alkaline-earth-metal",
  Lanthanide = "lanthanide",
  Actinide = "actinide",
  TransitionMetal = "transition-metal",
  PostTransitionMetal = "post-transition-metal",
  Metalloid = "metalloid",
  Nonmetal = "nonmetal",
  Halogen = "halogen",
  NobleGas = "noble-gas",
  Unknown = "unknown"
}

export const categoryColors: Record<ElementCategory, string> = {
  [ElementCategory.AlkaliMetal]: "bg-red-500",
  [ElementCategory.AlkalineEarthMetal]: "bg-orange-400",
  [ElementCategory.Lanthanide]: "bg-pink-400",
  [ElementCategory.Actinide]: "bg-purple-500",
  [ElementCategory.TransitionMetal]: "bg-yellow-500",
  [ElementCategory.PostTransitionMetal]: "bg-blue-300",
  [ElementCategory.Metalloid]: "bg-green-400",
  [ElementCategory.Nonmetal]: "bg-green-600",
  [ElementCategory.Halogen]: "bg-teal-400",
  [ElementCategory.NobleGas]: "bg-indigo-400",
  [ElementCategory.Unknown]: "bg-gray-400"
};

export const categoryNames: Record<ElementCategory, string> = {
  [ElementCategory.AlkaliMetal]: "Alkali Metal",
  [ElementCategory.AlkalineEarthMetal]: "Alkaline Earth Metal",
  [ElementCategory.Lanthanide]: "Lanthanide",
  [ElementCategory.Actinide]: "Actinide",
  [ElementCategory.TransitionMetal]: "Transition Metal",
  [ElementCategory.PostTransitionMetal]: "Post-Transition Metal",
  [ElementCategory.Metalloid]: "Metalloid",
  [ElementCategory.Nonmetal]: "Nonmetal",
  [ElementCategory.Halogen]: "Halogen",
  [ElementCategory.NobleGas]: "Noble Gas",
  [ElementCategory.Unknown]: "Unknown"
};

export interface ElementUsage {
  applications: string[];
  industries: string[];
  funFacts: string[];
}