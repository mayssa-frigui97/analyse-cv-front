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
      langues
      experiences
      formations
      projets
      interets
      competences{
        nom
      }
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

const findAllCompetences = gql`
query findAllCompetences
{
  findAllCompetences
  {
    nom
  }
}`;

const uploadSigleFile = gql`
  mutation uploadSigleFile($upload: Upload!)
  {
    uploadSigleFile(upload: $upload)
  }`;

export {
  findCvPersonne,
  findAllCompetences,
  uploadSigleFile
}
