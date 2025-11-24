// Validate stream form data
export function validateStreamForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Source name is required';
  }

  if (!formData.url || formData.url.trim() === '') {
    errors.url = 'Stream URL is required';
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
    enabled: true,
  };
}

/**
 * Calculate optimal grid layout based on stream count (supports 1-16 streams)
 * Uses square-root algorithm to minimize empty spaces and centers incomplete rows
 * 
 * Layout Examples:
 * 1:  1x1 → [S1]
 * 2:  2x1 → [S1, S2]
 * 3:  2x2 → [S1, S2] [__S3__] (centered)
 * 4:  2x2 → [S1, S2] [S3, S4]
 * 5:  3x2 → [S1, S2, S3] [_S4, S5_] (centered)
 * 6:  3x2 → [S1, S2, S3] [S4, S5, S6]
 * 7:  3x3 → [S1, S2, S3] [S4, S5, S6] [__S7__] (centered)
 * 8:  3x3 → [S1, S2, S3] [S4, S5, S6] [_S7, S8_] (centered)
 * 9:  3x3 → [S1, S2, S3] [S4, S5, S6] [S7, S8, S9]
 * 10: 4x3 → [S1, S2, S3, S4] [S5, S6, S7, S8] [_S9, S10_] (centered)
 * 11: 4x3 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11] (centered)
 * 12: 4x3 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11, S12]
 * 13: 4x4 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11, S12] [__S13__] (centered)
 * 14: 4x4 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11, S12] [_S13, S14_] (centered)
 * 15: 4x4 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11, S12] [S13, S14, S15] (centered)
 * 16: 4x4 → [S1, S2, S3, S4] [S5, S6, S7, S8] [S9, S10, S11, S12] [S13, S14, S15, S16]
 * 
 * @param {number} streamCount - Number of active streams (1-16)
 * @returns {Object} Layout data with cols, rows, and centered positions
 */
export function calculateGridLayout(streamCount) {
  if (streamCount <= 0) {
    return { 
      layout: '1x1', 
      cols: 1, 
      rows: 1,
      streamCount: 0,
      positions: [] 
    };
  }
  
  // Clamp to maximum 16 streams
  const clampedCount = Math.min(streamCount, 16);
  
  // Calculate columns as ceiling of square root
  // This creates a square-ish grid (1→1, 2→2, 3→2, 4→2, 5→3, 9→3, 10→4, etc.)
  const cols = Math.ceil(Math.sqrt(clampedCount));
  
  // Calculate rows as ceiling of streams divided by columns
  // This ensures no completely empty rows
  const rows = Math.ceil(clampedCount / cols);
  
  // Calculate positions for each stream with centering for incomplete rows
  const positions = [];
  let streamIndex = 0;
  
  for (let row = 0; row < rows; row++) {
    // How many streams in this row?
    const streamsInThisRow = Math.min(cols, clampedCount - streamIndex);
    
    // Center offset for rows with fewer streams than columns
    // Example: 3 streams in row, 4 cols → offset = (4-3)/2 = 0.5
    const offset = (cols - streamsInThisRow) / 2;
    
    for (let col = 0; col < streamsInThisRow; col++) {
      positions.push({
        streamIndex,
        row,
        col: col + offset, // Apply centering offset (fractional positioning)
        actualCol: col,
        isCentered: streamsInThisRow < cols
      });
      streamIndex++;
    }
  }
  
  return {
    layout: `${cols}x${rows}`,
    cols,
    rows,
    streamCount: clampedCount,
    positions
  };
}

// Helper to get just the layout string (for backward compatibility)
export function getLayoutString(streamCount) {
  return calculateGridLayout(streamCount).layout;
}

/**
 * Get detailed layout info for debugging/display
 * @param {number} streamCount - Number of streams
 * @returns {string} Human-readable layout description
 */
export function getLayoutDescription(streamCount) {
  const { cols, rows, positions } = calculateGridLayout(streamCount);
  const rowDescriptions = [];
  
  let currentRow = -1;
  let rowStreams = [];
  
  positions.forEach((pos, idx) => {
    if (pos.row !== currentRow) {
      if (rowStreams.length > 0) {
        const isCentered = rowStreams[0].isCentered;
        rowDescriptions.push(
          `Row ${currentRow + 1}: ${rowStreams.length} stream${rowStreams.length > 1 ? 's' : ''}${isCentered ? ' (centered)' : ''}`
        );
      }
      currentRow = pos.row;
      rowStreams = [];
    }
    rowStreams.push(pos);
  });
  
  if (rowStreams.length > 0) {
    const isCentered = rowStreams[0].isCentered;
    rowDescriptions.push(
      `Row ${currentRow + 1}: ${rowStreams.length} stream${rowStreams.length > 1 ? 's' : ''}${isCentered ? ' (centered)' : ''}`
    );
  }
  
  return `${cols}x${rows} grid - ${rowDescriptions.join(', ')}`;
}

// Get initial stitch configuration
export function getInitialStitchConfig() {
  return {
    resolution: '1920x1080',
    framerate: 30,
    bitrate: '4000k',
    outputFormat: 'hls',
    audioStreamId: null,
  };
}
