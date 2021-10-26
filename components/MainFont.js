const FontFaceObserver = require('fontfaceobserver')

const MainFont = () => {
    const link = document.createElement('link')
    link.href = 'https:/' + '/fonts.googleapis.com/css?family=Quicksand'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    const quicksand = new FontFaceObserver('Quicksand')
    quicksand.load().then(() => {
        document.documentElement.classList.add('quicksand')
    })
}

export default MainFont
