const glitch = {
  rgb: (img, amount = 10) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = data.data
    
    for(let i = 0; i < pixels.length; i += 4) {
      if(i + amount * 4 < pixels.length) {
        pixels[i] = pixels[i + amount * 4] 
      }
      if(i - amount * 4 > 0) {
        pixels[i + 2] = pixels[i - amount * 4] 
      }
    }
    
    ctx.putImageData(data, 0, 0)
    return canvas.toDataURL()
  },

  sortPixels: (img, threshold = 50) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = data.data
    
    for(let y = 0; y < canvas.height; y++) {
      let row = []
      for(let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4
        const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
        
        if(brightness > threshold) {
          row.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]])
        } else if(row.length) {
          row.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]))
          
          let x2 = x - row.length
          for(let pixel of row) {
            const j = (y * canvas.width + x2) * 4
            pixels[j] = pixel[0]
            pixels[j + 1] = pixel[1] 
            pixels[j + 2] = pixel[2]
            pixels[j + 3] = pixel[3]
            x2++
          }
          row = []
        }
      }
    }
    
    ctx.putImageData(data, 0, 0)
    return canvas.toDataURL()
  },

  scanlines: (img, gap = 4) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = data.data
    
    for(let y = 0; y < canvas.height; y += gap) {
      for(let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4
        pixels[i] = pixels[i] * 0.3     
        pixels[i + 1] = pixels[i + 1] * 0.3 
        pixels[i + 2] = pixels[i + 2] * 0.3 
      }
    }
    
    ctx.putImageData(data, 0, 0)
    return canvas.toDataURL()
  }
}

window.glitch = glitch
