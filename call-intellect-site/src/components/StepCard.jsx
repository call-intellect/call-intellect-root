const StepCard = ({ 
  number, 
  title, 
  description, 
  numberColor = "text-blue-600",
  className = ""
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className={`text-2xl font-bold ${numberColor} mb-4`}>
        {typeof number === 'string' ? number : `0${number}`}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default StepCard

