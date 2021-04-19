import gql from 'graphql-tag';
import { NgModule } from '@angular/core';

const findCvCol = gql`
  query findCvCandidat($idCand: Int!) {
    findCvCandidat(idCand: $idCand) {
      id
      cmptGithub
      cmptLinkedin
      description
      statutCV
      formations {
        id
        universite
        dateDebut
        dateFin
        specialite
        niveau
        mention
      }
      certificats {
        id
        nom
        dateObtention
        dateExpiration
        niveau
      }
      competences {
        id
        nom
        version
        niveau
      }
      langues {
        id
        nom
        niveau
        certifie
      }
      experiences {
        id
        societe
        poste
        dateDebut
        dateFin
        description
        motCles
      }
      activiteAssociatives {
        id
        dateDebut
        dateFin
        poste
        association
        description
      }
      personne {
        id
        nom
        prenom
        cin
        dateNaiss
        adresse
        tel
        email
        avatar
      }
    }
  }
`;

const findUniversites = gql`
query findUniversites
{
  findUniversites
  {
    universite
  }
}`;

const findSpecialites = gql`
query findSpecialites
{
  findSpecialites
  {
    specialite
  }
}`;

const findNivFormations = gql`
query findNivFormations
{
  findNivFormations
  {
    niveau
  }
}`;

const findExperiencesCv = gql`
query findExperiencesCv($idCv: Int!)
{
  findExperiencesCv(idCv: $idCv)
  {
    id
    dateDebut
    dateFin
  }
}`;

const findPostes = gql`
query findPostes
{
  findPostes
  {
    posteAct
  }
}`;

const findCompetences = gql`
query findCompetences
{
  findCompetences
  {
    nom
  }
}`;

const updateCertif = gql`
  mutation updateCertif($updateCertifInput: UpdateCertifInput!, $idCertif: Int!)
  {
    updateCertif(updateCertifInput: $updateCertifInput, idCertif: $idCertif){
      id
      dateObtention
      dateExpiration
      nom
      niveau
    }
  }`;

const updateFormation = gql`
  mutation updateFormation($updateFormationInput: UpdateFormationInput!, $idFormation: Int!)
  {
    updateFormation(updateFormationInput: $updateFormationInput, idFormation: $idFormation){
      id
      dateDebut
      dateFin
      universite
      niveau
      specialite
      mention
    }
  }`;

const updateAct = gql`
  mutation updateAct($updateActAssocInput: UpdateActAssocInput!, $idAct: Int!) {
    updateAct(updateActAssocInput: $updateActAssocInput, idAct: $idAct) {
      id
      dateDebut
      dateFin
      poste
      association
      description
    }
  }
`;

const updateLangue = gql`
  mutation updateLangue($updateLangueInput: UpdateLangueInput!, $idLangue: Int!)
  {
    updateLangue(updateLangueInput: $updateLangueInput, idLangue: $idLangue){
      id
      nom
      niveau
      certifie
    }
  }`;

const updateExperience = gql`
  mutation updateExperience($updateExperienceInput: UpdateExperienceInput!, $idExperience: Int!)
  {
    updateExperience(updateExperienceInput: $updateExperienceInput, idExperience: $idExperience){
      id
      societe
      poste
      dateDebut
      dateFin
      description
      motCles
    }
  }`;


const updateCompetence = gql`
  mutation updateCompetence($updateCompetenceInput: UpdateCompetenceInput!, $idCompetence: Int!)
  {
    updateCompetence(updateCompetenceInput: $updateCompetenceInput, idCompetence: $idCompetence){
      id
      nom
      niveau
      version
    }
  }`;





export {
  findCvCol,
  findUniversites,
  findSpecialites,
  findNivFormations,
  findExperiencesCv,
  findPostes,
  findCompetences,
  updateCertif,
  updateFormation,
  updateExperience,
  updateCompetence,
  updateLangue,
  updateAct
}
