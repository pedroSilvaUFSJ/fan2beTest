import React, { useState } from 'react'
import * as editUserNamePasswordFormStyles from './edit-username-password-form.module.scss'
import { useTranslation } from 'gatsby-plugin-react-i18next';

/**
 * TODO : Editing and Submission of data. Styles already created
 * Missing <span>{editLabel}<img src={editIcon} /></span>
 * Missing import editIcon from '../../../../images/edit.svg' // EDIT ICON
 */
const EditUserNamePasswordForm = ({ username }) => {

    const propLabels = {
        emaillabel: useTranslation().t('edituseremailpassword.email'),
        passwordlabel: useTranslation().t('edituseremailpassword.password'),
        editLabel: useTranslation().t('edituseremailpassword.editlabel')
    }

    const [isEditableUsername /*, setIsEditableUsername*/] = useState(false)
    const [isEditablePassword /*, setIsEditablePassword*/] = useState(false)
    const [usernameInputValue /*, setUsernameInputValue*/] = useState(username)
    const [passwordInputValue /*, setPasswordInputValue*/] = useState('password')

    return (
        <div className={editUserNamePasswordFormStyles.account}>
            <label htmlFor='email'>{propLabels.emaillabel}</label>
            <input id="email" type="text" disabled={!isEditableUsername} value={usernameInputValue} />

            <label htmlFor='password'>{propLabels.passwordlabel}</label>
            <input id="password" type="password" disabled={!isEditablePassword} value={passwordInputValue} />
        </div>
    )
}

export default EditUserNamePasswordForm