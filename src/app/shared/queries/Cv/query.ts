import gql from 'graphql-tag';
import { NgModule } from '@angular/core';

const findAllCompetences = gql`
query findAllCompetences
{
  findAllCompetences
  {
    nom
  }
}`;

const uploadFile = gql`
  mutation uploadFile($file: Upload!)
  {
    uploadFile(file: $file)
  }`;

export {
  findAllCompetences,
  uploadFile
}
