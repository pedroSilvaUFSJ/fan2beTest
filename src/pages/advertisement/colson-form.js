import React, {useState} from 'react';
import { graphql } from 'gatsby'
import SEO from '../../components/core-module/organisms/seo/seo';
import Layout from "./../../templates/layout"
import { useTranslation } from "gatsby-plugin-react-i18next"
import ColsonFormRequest from '../../components/advertisments-module/molecules/colson-form-request/colson-form-request';
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'


const ColsonForm = () => {

    const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] = useState(false)
    const translate = useTranslation().t;

    return <Layout>
        <SEO title={translate('sitename') + ' - ' + translate('advertisement.interests')} description={translate('advertisement.colson.metaDescription')}/>
        <div className={'container'}>
        <AuthenticationIntro title={!isFormSubmittedSuccessfully && translate('colson.title')} hideImage={true}/>
            <ColsonFormRequest 
                setSuccess={setIsFormSubmittedSuccessfully}
            />
        </div>
    </Layout>
}


export default ColsonForm


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