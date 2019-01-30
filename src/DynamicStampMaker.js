// function isInt (n) {
//   return Number(n) === n && n % 1 === 0
// }

export default class DynamicStampMaker {
  constructor () {
    this.canvases = {}
  }

  make ({ size, color }) {
    this.canvases[color] = this.canvases[color] || {}

    if (this.canvases[color][size] != null) {
      return this.canvases[color][size]
    }
    const canvas = document.createElement('canvas')
    size = size + (size % 2)
    canvas.width = size
    canvas.height = size
    canvas.style = 'margin:0 2px 2px 0'

    const context = canvas.getContext('2d')
    const imageData = context.createImageData(size, size)
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255
      imageData.data[i + 1] = 255
      imageData.data[i + 2] = 255
      imageData.data[i + 3] = 0
    }
    this.plotCircle(size * 2, (size * 4) * (size / 2), size / 2, imageData, size)
    this.fillCircle(imageData)
    context.putImageData(imageData, 0, 0)
    this.canvases[color][size] = canvas
    // document.body.appendChild(canvas)
    return canvas
  }

  plotCircle (xm, ym, r, imageData, size) {
    let x = -r
    let y = 0
    let err = 2 - 2 * r /* bottom left to top right */

    do {
      /*   I. Quadrant +x +y */
      const i = xm - ((x + 1) * 4) + (ym + ((y - 1) * (size * 4)))
      imageData.data[i + 0] = 0
      imageData.data[i + 1] = 0
      imageData.data[i + 2] = 0
      imageData.data[i + 3] = 255
      /*  II. Quadrant -x +y */
      const ii = xm - (y * (size * 4)) + (ym - ((x + 1) * 4))
      imageData.data[ii + 0] = 0
      imageData.data[ii + 1] = 0
      imageData.data[ii + 2] = 0
      imageData.data[ii + 3] = 255
      /* III. Quadrant -x -y */
      const iii = (xm + (x * 4)) + (ym - (y * (size * 4)))
      imageData.data[iii + 0] = 0
      imageData.data[iii + 1] = 0
      imageData.data[iii + 2] = 0
      imageData.data[iii + 3] = 255
      /*  IV. Quadrant +x -y */
      const iv = (xm + ((y - 1) * (size * 4))) + (ym + (x * 4))
      imageData.data[iv + 0] = 0
      imageData.data[iv + 1] = 0
      imageData.data[iv + 2] = 0
      imageData.data[iv + 3] = 255
      r = err
      if (r <= y) {
        err += ++y * 2 + 1 /* y step */
      }
      if (r > x || err > y) {
        err += ++x * 2 + 1 /* x step */
      }
    } while (x < 0)
  }

  fillCircle (imageData) {
    const cols = imageData.width * 4
    for (let row = 1; row < imageData.height - 1; row += 1) {
      let isHitBlack = false
      let isHitWhite = false
      let isEnded = false
      for (let col = 0; col < cols; col += 4) {
        const index = cols * row + col
        const R = imageData.data[index]
        const G = imageData.data[index + 1]
        const B = imageData.data[index + 2]
        const isBlack = R === 0 && G === 0 && B === 0
        const isWhite = R === 255 && G === 255 && B === 255
        if (isBlack && !isHitBlack) {
          isHitBlack = true
        } else if (isWhite && isHitBlack) {
          isHitWhite = true
        } else if (isBlack && isHitBlack && isHitWhite) {
          isEnded = true
        }
        if (isHitBlack && isHitWhite && !isEnded) {
          imageData.data[index] = 0
          imageData.data[index + 1] = 0
          imageData.data[index + 2] = 0
          imageData.data[index + 3] = 255
        }
      }
    }
  }
}
