import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors, getTier, getTierColor, typography } from '../theme/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ScoreRingProps {
  score: number; // 0-1000
  size?: number;
  strokeWidth?: number;
  /** If set, shows a green ghost arc extending to score + projectedGain */
  projectedGain?: number;
  /** If set, shows a red ghost arc retracting to score - projectedLoss */
  projectedLoss?: number;
}

const MAX_SCORE = 1000;

export default function ScoreRing({
  score,
  size = 220,
  strokeWidth = 16,
  projectedGain,
  projectedLoss,
}: ScoreRingProps) {
  const tier = getTier(score);
  const tierColor = getTierColor(tier);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedScore = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedScore, {
      toValue: score,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [score]);

  const mainStrokeDashoffset = animatedScore.interpolate({
    inputRange: [0, MAX_SCORE],
    outputRange: [circumference, 0],
  });

  const gainFraction = projectedGain ? Math.min(score + projectedGain, MAX_SCORE) / MAX_SCORE : 0;
  const lossFraction = projectedLoss ? Math.max(score - projectedLoss, 0) / MAX_SCORE : 0;
  const scoreFraction = score / MAX_SCORE;

  const gainDashoffset = circumference * (1 - gainFraction);
  const lossDashoffset = circumference * (1 - lossFraction);
  const baseDashoffset = circumference * (1 - scoreFraction);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.gray100}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Projected gain ghost arc (green, behind main) */}
          {projectedGain ? (
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.greenTint}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={gainDashoffset}
              strokeLinecap="round"
            />
          ) : null}

          {/* Projected loss ghost arc (red, overlay showing what would be lost) */}
          {projectedLoss ? (
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.redTint}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={baseDashoffset}
              strokeLinecap="round"
            />
          ) : null}

          {/* Main score arc (animated) */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={tierColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={projectedLoss ? lossDashoffset : mainStrokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      <View style={styles.center}>
        <Text style={[typography.display, { color: colors.ink }]}>{score}</Text>
        <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
          <Text style={styles.tierText}>{tier.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tierText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
