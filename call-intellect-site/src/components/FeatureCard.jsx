const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  iconColor = "text-blue-600",
  className = ""
}) => {
  return (
    <div className={`text-center ${className}`}>
      <Icon className={`w-16 h-16 ${iconColor} mx-auto mb-4`} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default FeatureCard

