import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {
  Line,
  Circle,
  Text as SvgText,
  Rect,
  Polyline,
} from 'react-native-svg';
import {TouchableWithoutFeedback} from 'react-native';

const GRAPH_SIZE = 300;
const STEP = 10;
const GRID_STEP = GRAPH_SIZE / (100 / STEP);

const staticData = [
  {x: 10, y: 20},
  {x: 50, y: 80},
  {x: 90, y: 40},
];

export default function Graph() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handlePress = event => {
    const {locationX, locationY} = event.nativeEvent;

    // Adjust for 30px left padding in SVG
    const adjustedX = locationX - 30;
    const adjustedY = locationY;

    if (
      adjustedX < 0 ||
      adjustedY < 0 ||
      adjustedX > GRAPH_SIZE ||
      adjustedY > GRAPH_SIZE
    ) {
      return; // Out of bounds
    }

    const xIndex = Math.round(adjustedX / GRID_STEP);
    const yIndex = Math.round((GRAPH_SIZE - adjustedY) / GRID_STEP);

    setSelectedPoint({x: xIndex * STEP, y: yIndex * STEP});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Interactive Graph</Text>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Svg height={GRAPH_SIZE + 30} width={GRAPH_SIZE + 40}>
          {/* Grid background */}
          <Rect
            x={30}
            y={0}
            width={GRAPH_SIZE}
            height={GRAPH_SIZE}
            fill="#f9f9f9"
          />
          <Polyline
            points={staticData
              .map(
                point =>
                  `${30 + (point.x * GRID_STEP) / STEP},${
                    GRAPH_SIZE - (point.y * GRID_STEP) / STEP
                  }`,
              )
              .join(' ')}
            fill="none"
            stroke="#007AFF"
            strokeWidth="2"
          />

          {/* Grid lines */}
          {[...Array(11)].map((_, i) => {
            const pos = i * GRID_STEP;
            return (
              <React.Fragment key={i}>
                {/* Vertical */}
                <Line
                  x1={30 + pos}
                  y1="0"
                  x2={30 + pos}
                  y2={GRAPH_SIZE}
                  stroke="#ddd"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                {/* Horizontal */}
                <Line
                  x1={30}
                  y1={pos}
                  x2={GRAPH_SIZE + 30}
                  y2={pos}
                  stroke="#ddd"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                {/* Axis labels */}
                <SvgText
                  x={25}
                  y={GRAPH_SIZE - pos + 4}
                  fontSize="10"
                  textAnchor="end"
                  fill="#444">
                  {i * STEP}
                </SvgText>
                <SvgText
                  x={30 + pos}
                  y={GRAPH_SIZE + 15}
                  fontSize="10"
                  textAnchor="middle"
                  fill="#444">
                  {i * STEP}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Static points */}
          {staticData.map((point, index) => (
            <Circle
              key={index}
              cx={30 + (point.x * GRID_STEP) / STEP}
              cy={GRAPH_SIZE - (point.y * GRID_STEP) / STEP}
              r="5"
              fill="blue"
            />
          ))}

          {/* Selected point */}
          {selectedPoint && (
            <>
              <Circle
                cx={30 + (selectedPoint.x * GRID_STEP) / STEP}
                cy={GRAPH_SIZE - (selectedPoint.y * GRID_STEP) / STEP}
                r="6"
                fill="red"
              />
              <Rect
                x={30 + (selectedPoint.x * GRID_STEP) / STEP - 30}
                y={GRAPH_SIZE - (selectedPoint.y * GRID_STEP) / STEP - 30}
                width="60"
                height="20"
                rx="4"
                ry="4"
                fill="#fff"
                stroke="#000"
                strokeWidth="0.5"
              />
              <SvgText
                x={30 + (selectedPoint.x * GRID_STEP) / STEP}
                y={GRAPH_SIZE - (selectedPoint.y * GRID_STEP) / STEP - 15}
                fontSize="15"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#000">
                ({selectedPoint.x}, {selectedPoint.y})
              </SvgText>
            </>
          )}
        </Svg>
      </TouchableWithoutFeedback>

      {selectedPoint && (
        <Text style={styles.infoText}>
          📍 You selected: X = {selectedPoint.x}, Y = {selectedPoint.y}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
});
