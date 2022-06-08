import React, {useState} from 'react';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo';
import Layout from "./../../templates/layout"
import { useTranslation } from "gatsby-plugin-react-i18next"
import EgPowerFormRequest from '../../components/advertisments-module/molecules/egpower-form-request/egpower-form-request';
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'


const EgPowerForm = () => {

    const isBrowser = () => typeof window !== "undefined"
    const queryString = isBrowser() && window ? window.location.search : ''
    const urlParams = new URLSearchParams(queryString);
    const entityId = urlParams.get('entityId');

    const translate = useTranslation().t;

    return <Layout>
        <SEO title={'EG Power'}/>
        <div className={'container'}>
        <AuthenticationIntro title={translate('egpower.title')} hideImage={true}/>
            <EgPowerFormRequest
                clubId={entityId}
            />
        </div>
    </Layout>
}


export default EgPowerForm


export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;