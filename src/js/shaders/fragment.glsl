precision mediump float;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec4 texture = texture2D(uTexture, vUv);
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = texture;
}