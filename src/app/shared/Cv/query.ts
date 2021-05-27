import gql from 'graphql-tag';
import { NgModule } from '@angular/core';

const findCvPersonne = gql`
  query findCvPersonne($idPersonne: Int!) {
    findCvPersonne(idPersonne: $idPersonne) {
      id
      cmptLinkedin
      statutCV
      activiteAssociatives
      certificats
      competences
      langues
      experiences
      formations
      projets
      interets
      personne {
        id
        nom
        etatCivil
        dateNaiss
        adresse
        tel
        email
        avatar
        recommande
      }
    }
  }
`;

// const findUniversites = gql`
// query findUniversites
// {
//   findUniversites
//   {
//     universite
//   }
// }`;

// const findSpecialites = gql`
// query findSpecialites
// {
//   findSpecialites
//   {
//     specialite
//   }
// }`;

// const findNivFormations = gql`
// query findNivFormations
// {
//   findNivFormations
//   {
//     niveau
//   }
// }`;

// const findExperiencesCv = gql`
// query findExperiencesCv($idCv: Int!)
// {
//   findExperiencesCv(idCv: $idCv)
//   {
//     id
//     dateDebut
//     dateFin
//   }
// }`;

// const findPostes = gql`
// query findPostes
// {
//   findPostes
//   {
//     posteAct
//   }
// }`;

const findCompetences = gql`
query findCvs
{
  findCvs
  {
    competences
  }
}`;

// const updateCertif = gql`
//   mutation updateCertif($updateCertifInput: UpdateCertifInput!, $idCertif: Int!)
//   {
//     updateCertif(updateCertifInput: $updateCertifInput, idCertif: $idCertif){
//       id
//       dateObtention
//       dateExpiration
//       nom
//       niveau
//     }
//   }`;

// const updateFormation = gql`
//   mutation updateFormation($updateFormationInput: UpdateFormationInput!, $idFormation: Int!)
//   {
//     updateFormation(updateFormationInput: $updateFormationInput, idFormation: $idFormation){
//       id
//       dateDebut
//       dateFin
//       universite
//       niveau
//       specialite
//       mention
//     }
//   }`;

// const updateAct = gql`
//   mutation updateAct($updateActAssocInput: UpdateActAssocInput!, $idAct: Int!) {
//     updateAct(updateActAssocInput: $updateActAssocInput, idAct: $idAct) {
//       id
//       dateDebut
//       dateFin
//       poste
//       association
//       description
//     }
//   }
// `;

// const updateLangue = gql`
//   mutation updateLangue($updateLangueInput: UpdateLangueInput!, $idLangue: Int!)
//   {
//     updateLangue(updateLangueInput: $updateLangueInput, idLangue: $idLangue){
//       id
//       nom
//       niveau
//       certifie
//     }
//   }`;

// const updateExperience = gql`
//   mutation updateExperience($updateExperienceInput: UpdateExperienceInput!, $idExperience: Int!)
//   {
//     updateExperience(updateExperienceInput: $updateExperienceInput, idExperience: $idExperience){
//       id
//       societe
//       poste
//       dateDebut
//       dateFin
//       description
//       motCles
//     }
//   }`;


// const updateCompetence = gql`
//   mutation updateCompetence($updateCompetenceInput: UpdateCompetenceInput!, $idCompetence: Int!)
//   {
//     updateCompetence(updateCompetenceInput: $updateCompetenceInput, idCompetence: $idCompetence){
//       id
//       nom
//       niveau
//       version
//     }
//   }`;





export {
  findCvPersonne,
  // findUniversites,
  // findSpecialites,
  // findNivFormations,
  // findExperiencesCv,
  // findPostes,
  findCompetences,
  // updateCertif,
  // updateFormation,
  // updateExperience,
  // updateCompetence,
  // updateLangue,
  // updateAct
}
