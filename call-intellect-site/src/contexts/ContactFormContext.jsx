import React, { createContext, useContext, useState } from 'react'
import ContactForm from '../components/ContactForm'

const ContactFormContext = createContext()

export const ContactFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formType, setFormType] = useState('general')

  const openForm = (type = 'general') => {
    setFormType(type)
    setIsOpen(true)
  }

  const closeForm = () => setIsOpen(false)

  return (
    <ContactFormContext.Provider value={{ isOpen, formType, openForm, closeForm }}>
      {children}
      <ContactForm isOpen={isOpen} onClose={closeForm} formType={formType} />
    </ContactFormContext.Provider>
  )
}

export const useContactForm = () => useContext(ContactFormContext)
