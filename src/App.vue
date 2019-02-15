<template>
  <div id="app">
    <v-stage
      class="stage"
      ref="stage"
      :config="stageConfig"
    >
      <v-layer ref="paintingCanvas">
        <v-image
          v-if="canvas"
          :config="{
            image: canvas,
            x: 0,
            y: 0,
            width: stageConfig.width,
            height: stageConfig.height,
          }"
          @mouseover="handleStageMouseOver"
          @mouseout="handleStageMouseOut"
          @mousemove="handleStageMouseMove"
          @mousedown="handleStageMouseDown"
          @mouseup="handleStageMouseUp"
        />
        <v-arc
          :config="brushCursorConfig"
        />
      </v-layer>
    </v-stage>
    <div style="margin-bottom:100px">
      <label>
        <input
          type="radio"
          name="mode"
          :checked="currentMode === Mode.Brush"
          @change="handleBrushRadioButtonChange"
        />
        Brush
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          :checked="currentMode === Mode.Eraser"
          @change="handleEraserRadioButtonChange"
        />
        Eraser
      </label>
    </div>
    <div style="text-align:left">
      Size
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        :value="size"
        @input="handleSizeChange"
      />
      {{size}}
      /
      Color
      <input
        type="color"
        :value="color"
        @change="handleColorChange"
      />
      <br />
      <button @click="handleSaveButtonClick">save</button>
    </div>
  </div>
</template>

<script>
import circle from './assets/11.gif'
import PxBrush from './PxBrush'

window.Konva.pixelRatio = window.devicePixelRatio || 1

const Mode = {
  Brush: 'brush',
  Eraser: 'eraser'
}

export default {
  name: 'App',

  data: () => ({
    stageConfig: {},
    size: 11,
    color: '#000000',
    brushCursorConfig: {
      fill: '#000000',
      strokeWidth: 0,
      x: 0,
      y: 0,
      perfectDrawEnabled: false,
      angle: 360
    },
    isMouseOver: false,
    Mode,
    currentMode: Mode.Brush,
    isPainting: false,
    beginningPosition: null,
    canvas: null,
    context: null,
    isSimple: false,
    isSimpleStamp: false
  }),

  created () {
    window.addEventListener('resize', this.handleWindowResize)

    this.exampleImage = new Image()
    this.exampleImage.src = circle

    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = 500
    this.context = this.canvas.getContext('2d')

    this.pxBrush = new PxBrush(this.canvas)
  },

  mounted () {
    this.$nextTick(() => {
      this.handleWindowResize()
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  computed: {
    canvasOperation () {
      return this.currentMode === Mode.Brush
        ? 'source-over'
        : 'destination-out'
    },

    dpr () {
      return window.devicePixelRatio
    }
  },

  methods: {
    handleWindowResize () {
      const width = window.innerWidth
      const height = 500
      this.stageConfig = {
        ...this.stageConfig,
        width,
        height
        // scale: { x: this.dpr, y: this.dpr }
      }
    },

    handleStageMouseOver () {
      this.isMouseOver = true
    },

    handleStageMouseOut () {
      this.isMouseOver = false
      this.isPainting = false
    },

    handleStageMouseMove (e) {
      const halfSize = (this.size - (this.size % 2)) / 2
      const stage = this.$refs.stage.getStage()
      const position = stage.getPointerPosition()
      const innerRadius = halfSize - 1 < 0 ? 0 : halfSize - 1
      const size = { innerRadius, outerRadius: halfSize }
      this.brushCursorConfig = {
        ...this.brushCursorConfig,
        ...size,
        x: Math.round(position.x),
        y: Math.round(position.y)
      }

      if (!this.isPainting || !this.beginningPosition) { return false }

      if (this.isSimple) {
        this.context.imageSmoothingEnabled = false
        this.context.strokeStyle = '#000'
        this.context.lineWidth = this.size
        this.context.lineJoin = 'round'
        this.context.beginPath()
        const { x: startX, y: startY } = this.beginningPosition
        this.context.moveTo(startX, startY)
        const { x: destX, y: destY } = position
        this.context.lineTo(destX, destY)
        this.context.closePath()
        this.context.stroke()
      } else if (this.isSimpleStamp) {
        const x = position.x - halfSize
        const y = position.y - halfSize
        this.context.drawImage(this.exampleImage, Math.round(x), Math.round(y))
      } else {
        switch (this.currentMode) {
          case Mode.Brush:
            this.pxBrush.draw({
              from: this.beginningPosition,
              to: position,
              size: this.size,
              color: this.color
            })
            break
          case Mode.Eraser:
            this.pxBrush.erase({
              from: this.beginningPosition,
              to: position,
              size: this.size,
              color: this.color
            })
            break
        }
      }

      this.$refs.paintingCanvas.getStage().batchDraw()
      this.beginningPosition = position
    },

    handleBrushRadioButtonChange (e) {
      if (e.target.checked) {
        this.currentMode = Mode.Brush
      }
    },

    handleEraserRadioButtonChange (e) {
      if (e.target.checked) {
        this.currentMode = Mode.Eraser
      }
    },

    handleStageMouseDown () {
      this.isPainting = true
      this.beginningPosition = this.$refs.stage.getStage().getPointerPosition()
      const method = this.currentMode === Mode.Brush ? 'draw' : 'erase'
      this.pxBrush[method]({
        from: this.beginningPosition,
        to: this.beginningPosition,
        size: this.size,
        color: this.color
      })
      this.$refs.paintingCanvas.getStage().batchDraw()
    },

    handleStageMouseUp () {
      this.isPainting = false
      this.beginningPosition = null
    },

    handleSizeChange (e) {
      this.size = parseInt(e.target.value)
    },

    handleColorChange (e) {
      this.color = e.target.value
    },

    handleSaveButtonClick () {
      this.pxBrush.exportAsPNG('result.png').then(file => {
        const url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.download = file.name
        a.href = url
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent('click')
        a.dispatchEvent(event)
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #ddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.stage {
  background-color: #fff;
}
</style>
