uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform vec2 uOffset;

attribute vec3 position;
attribute vec2 uv;

float M_PI = 3.1415926535897932384626433832795;

varying vec2 vUv;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
}

void main() {
    vUv = uv;

    vec3 newPosition = deformationCurve(position, uv, uOffset);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}