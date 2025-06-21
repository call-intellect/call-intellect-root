import { Button } from '@/components/ui/button'

const CTASection = ({ 
  title, 
  subtitle, 
  buttonText = "Заказать демонстрацию", 
  buttonVariant = "default",
  backgroundColor = "bg-blue-600",
  textColor = "text-white"
}) => {
  return (
    <section className={`py-16 ${backgroundColor} ${textColor}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl mb-8">
            {subtitle}
          </p>
        )}
        <Button 
          size="lg" 
          variant={buttonVariant}
          className={buttonVariant === "default" ? "bg-white text-blue-600 hover:bg-gray-100" : ""}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  )
}

export default CTASection

