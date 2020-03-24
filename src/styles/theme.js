const theme = {
	colors: {
		black: '#282828',
		white: '#e9eaeb',
		gray: '#6d6d6d',
		transparent: 'rgba(0,0,0,0.8)',
		translucent: 'rgba(40,40,40,1)',
		success: '#05ffa1',
		error: '#ff0563',
		c1: '#05ffa1',
		c2: '#ff71ce',
		c3: '#b967ff',
		c4: '#01cdfe',
		c5: '#fffb96',
		c6: '#00ff9e',
		get gr1() {
			return `linear-gradient(to bottom right, ${this.white}, ${this.gray})`
		},
		gr2:
			'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(212,212,212, 0.9))'
	},
	text: {
		t1: '1rem',
		t2: '0.8rem',
		t3: '0.6rem',
		h1: '2rem',
		h2: '1.8rem',
		h3: '1.6rem',
		h4: '1.4rem'
	},
	fonts: {
		primary: 'IBM Plex Sans, sans-serif',
		secondary: 'IBM Plex Mono, monospace'
	}
}

export default theme
