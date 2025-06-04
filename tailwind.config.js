/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		screens: {
  			md: '600px',
  			xl: '1200px',
  			'2xl': '1400px',
  			'3xl': '1600px'
  		},
  		fontFamily: {
  			corisande: [
  				'var(--font-corisande)'
  			]
  		},
  		colors: {
  			yellow: {
  				'200': '#E3DAC6',
  				'400': '#E5D3AC',
  				'600': '#E6CC91',
  				'800': '#E8C577',
  				'1000': '#EABE5C'
  			},
  			blue: {
  				'200': '#BFDAE4',
  				'400': '#9DD3E8',
  				'600': '#7CCBEB',
  				'800': '#5AC4EF',
  				'1000': '#38BDF2'
  			},
  			pink: {
  				'200': '#E4CCDC',
  				'400': '#E8B7D7',
  				'600': '#EBA3D2',
  				'800': '#EF8ECD',
  				'1000': '#F279C8'
  			},
  			purple: {
  				'200': '#CFC4DD',
  				'400': '#BEA7DA',
  				'600': '#AC8BD6',
  				'800': '#9B6ED3',
  				'1000': '#8951CF'
  			},
  			gray: {
  				white: '#FCFDFE',
  				light: '#F2F2F2',
  				medium: '#B0B0B0',
  				dark: '#363636',
  				black: '#1C1C1C'
  			},
  			'intense-purple': '#7546BC',
  			'intense-blue': '#33B1E4',
  			'intense-pink': '#F455BD',
  			'intense-yellow': '#FDC139',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
};
