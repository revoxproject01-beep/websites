/*!
 * A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.
 *
 * @author Marc Bruederlin <hello@marcbruederlin.com>
 * @version 2.0.0
 * @license MIT
 * @see https://github.com/marcbruederlin/particles.js
 */

/* exported Particles */
var Particles = (function(window, document) {
  'use strict';
  
  var canvas, ctx, particles = [], settings, requestAnimationFrame = 
    window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame || 
    function(callback) { window.setTimeout(callback, 1000 / 60); };
  
  settings = {
    particles: {
      number: 80,
      density: {
        enable: true,
        value_area: 800
      },
      color: '#fff',
      shape: 'circle',
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#fff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };
  
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
  }
  
  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  
  function init() {
    canvas = document.getElementById('particles-js');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    
    // Start animation
    requestAnimationFrame(animate);
  }
  
  function resizeCanvas() {
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Reset particles
    particles = [];
    for (var i = 0; i < settings.particles.number.value; i++) {
      particles.push(new Particle());
    }
  }
  
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();
    this.radius = Math.random() * settings.particles.size.value;
    this.color = settings.particles.color;
    
    if (settings.particles.move.anim.enable) {
      this.vx = this.vx * settings.particles.move.speed;
      this.vy = this.vy * settings.particles.move.speed;
    }
  }
  
  Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      // Move particles
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary check
      if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
      if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      
      // Draw particle
      p.draw();
      
      // Draw connections
      if (settings.particles.line_linked.enable) {
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          
          if (dist < settings.particles.line_linked.distance) {
            ctx.beginPath();
            ctx.strokeStyle = settings.particles.line_linked.color;
            ctx.lineWidth = settings.particles.line_linked.width;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Public API
  return {
    init: function() {
      init();
    },
    destroy: function() {
      canvas.width = 0;
      canvas.height = 0;
      particles = [];
      window.removeEventListener('resize', resizeCanvas, false);
    }
  };
})(window, document);

// Auto-initialize if element exists
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('particles-js')) {
    Particles.init();
  }
});