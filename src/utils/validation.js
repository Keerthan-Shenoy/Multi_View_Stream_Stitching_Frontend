// Validate stream form data
export function validateStreamForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Source name is required';
  }

  if (!formData.url || formData.url.trim() === '') {
    errors.url = 'Stream URL is required';
  }

  if (formData.position < 0 || formData.position > 15) {
    errors.position = 'Position must be between 0 and 15';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Get initial form data for stream
export function getInitialStreamFormData() {
  return {
    name: '',
    url: '',
    position: 0,
    enabled: true,
  };
}

// Get initial stitch configuration
export function getInitialStitchConfig() {
  return {
    layout: '4x4',
    resolution: '1920x1080',
    framerate: 30,
    bitrate: '4000k',
    outputFormat: 'hls',
    audioStreamId: null,
  };
}
