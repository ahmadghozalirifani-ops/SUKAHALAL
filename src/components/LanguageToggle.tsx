import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const isID = i18n.language === 'id'

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur rounded-full px-2 py-1 border border-gray-200 shadow-sm">
      <button
        onClick={() => i18n.changeLanguage('id')}
        className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${
          isID ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        🇮🇩 ID
      </button>
      <span className="text-gray-300 text-xs">|</span>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${
          !isID ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  )
}
