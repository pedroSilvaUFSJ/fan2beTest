import React, { useEffect, useState } from 'react'
import Emitter from '../../../../services/emitter'
import * as  overHeaderStyles from './over-header.module.scss'
import Advertisement, {classOptions} from "../../../advertisments-module/atoms/advertisement/advertisement"

/**
 * @returns A component with a div of with 100% wrapping an advertisement area of 80%
 */
const OverHeader = () => {

  const [mediaUrl, setMediaUrl] = useState('')
  const [altDescription, setAltDescription] = useState('')
  const [mediaType, setMediaType] = useState('')
  const [addUUID, setAddUUID] = useState('')
  const [destinationLink, setDestinationLink] = useState('')
  const [campaignId, setCampaignId] = useState('')

  useEffect(() => {
    Emitter.on('TOP_AD_EVENT', function({mediaUrl, mediaType, addUUID, destinationLink, altDescription, campaignId}) {
      setMediaUrl(mediaUrl)
      setAddUUID(addUUID)
      setAltDescription(altDescription)
      setMediaType(mediaType)
      setDestinationLink(destinationLink)
      setCampaignId(campaignId)
    })
  }, [Emitter])

  
  return (
    <div className={`${overHeaderStyles.content}`}>
      <div className={`${overHeaderStyles.image}`}>
       {!!addUUID && !!campaignId && <Advertisement campaignId={campaignId} mediaUrl={mediaUrl} addUUID={addUUID} mediaType={mediaType} destinationLink={destinationLink} altDescription={altDescription} classOption={classOptions.advertisementTop}/>}
      </div>
    </div >
  )

}
export default OverHeader
