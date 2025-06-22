#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

// API endpoint для обработки форм
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, formType, timestamp } = req.body

    const formTypeNames = {
      excursion: 'Экскурсия',
      demo: 'Демонстрация',
      calculate: 'Расчет стоимости',
      general: 'Общая заявка'
    }

    const emailContent = `
      <h2>Новая заявка с сайта Call-Intellect</h2>
      <p><strong>Тип заявки:</strong> ${formTypeNames[formType] || 'Общая заявка'}</p>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Время подачи:</strong> ${new Date(timestamp).toLocaleString('ru-RU')}</p>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'svmazur@mail.ru',
      subject: `Новая заявка: ${formTypeNames[formType] || 'Общая заявка'} - ${name}`,
      html: emailContent
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно отправлена' 
    })

  } catch (error) {
    console.error('Ошибка отправки email:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отправке заявки' 
    })
  }
})

// Проверка здоровья сервиса
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Contact form API server running on port ${PORT}`)
})

export default app

