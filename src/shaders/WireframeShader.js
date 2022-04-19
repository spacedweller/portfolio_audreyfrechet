import * as Three from "three";
import {shaderMaterial} from '@react-three/drei'
import glsl from "babel-plugin-glsl/macro"


const WireframeShaderMaterial = shaderMaterial(
  // Uniform
  {color: new Three.Color("yellow")},
  // Vertex Shader
  `
    void main() {
      vec3 scale = vec3(5.0, 5.0, 5.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position*scale, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 color;


    void main() {
      
      gl_FragColor.rgb = vec3(color);
    }
  `
)

export default WireframeShaderMaterial
