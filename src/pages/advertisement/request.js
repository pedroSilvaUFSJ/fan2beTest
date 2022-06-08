import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import Layout from "./../../templates/layout"
import { graphql } from 'gatsby'
import AuthenticationIntro from '../../components/authentication-module/atoms/authentication-intro/authentication-intro'
import AdvertisementRequestForm from '../../components/authentication-module/molecules/advertisement-request-form/advertisement-request-form'
import SEO from '../../components/core-module/organisms/seo/seo'

const Request = () => {
    const translation = useTranslation()
    const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] = useState(false)
    const propLabels = {
      text: "test",
      buttonLabel: "test",
      buttonUrl: "test",
      thankYouMessage: "test",
      reviewMessage: "test"
    }

    return (
        <Layout>
            <SEO title={translation.t('sitename') +' - ' + translation.t('advertisement.interests')} description={translation.t('advertisement.request.metaDescription')}/>
            <div className={'container'}>
              <AuthenticationIntro title={translation.t('advertisement.interests')} text={!isFormSubmittedSuccessfully && translation.t('advertisement.interests.description')} hideImage={true}/>
              
                <AdvertisementRequestForm 
                    setSuccess={setIsFormSubmittedSuccessfully}
                />
            </div>
        </Layout>
    )
}

export default Request

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