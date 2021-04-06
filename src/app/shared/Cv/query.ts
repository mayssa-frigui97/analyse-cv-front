import gql from 'graphql-tag';

const findCvCandidat = gql`
query findCvCandidat($idCand: Int!)
{
  findCvCandidat(idCand: $idCand)
  {
      id
      cmptGithub
      cmptLinkedin
      description
      statutCV
      formations{
        id
        universite
        dateDebut
        dateFin
        specialite
        niveau
        mention
      }
      certificats{
        id
        organisation
        dateObtention
        dateExpiration
        niveau
        }
      competences{
        id
        nom
        version
        niveau}
      langues{
        id
        nom
        niveau
        certifie}
      experiences{
        id
        societe
        poste
        dateDebut
        dateFin
        description
        motCles}
        activiteAssociatives
        {
          id
          dateDebut
          dateFin
          poste
          association
          description}
        candidat{
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
}`;

const findFormations = gql`
query findFormations
{
  findFormations
  {
    id
    universite
    specialite
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

const findCvs = gql`
query findCvs
{
  findCvs
  {
    id
    poste
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


export {
  findCvCandidat,
  findFormations,
  findExperiencesCv,
  findCvs,
  findCompetences
}
