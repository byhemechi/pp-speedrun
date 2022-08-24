export default interface Play {
  songDataType: number;
  playerID: string;
  songID: string;
  songDifficulty: string;
  songName: string;
  songArtist: string;
  songMapper: string;
  gameMode: null;
  songDifficultyRank: number;
  songSpeed: number;
  songStartTime: number;
  songDuration: number;
  songJumpDistance: number;
  trackers: {
    hitTracker: {
      leftNoteHit: number;
      rightNoteHit: number;
      bombHit: number;
      maxCombo: number;
      nbOfWallHit: number;
      miss: number;
      missedNotes: number;
      badCuts: number;
      leftMiss: number;
      leftBadCuts: number;
      rightMiss: number;
      rightBadCuts: number;
    };
    accuracyTracker: {
      accRight: string;
      accLeft: string;
      averageAcc: string;
      leftSpeed: string;
      rightSpeed: string;
      averageSpeed: string;
      leftHighestSpeed: number;
      rightHighestSpeed: number;
      leftPreswing: string;
      rightPreswing: string;
      averagePreswing: string;
      leftPostswing: string;
      rightPostswing: string;
      averagePostswing: string;
      leftTimeDependence: string;
      rightTimeDependence: string;
      averageTimeDependence: string;
      leftAverageCut: string[];
      rightAverageCut: string[];
      averageCut: string[];
      gridAcc: string[];
      gridCut: number[];
    };
    scoreTracker: {
      rawScore: number;
      score: number;
      personalBest: number;
      rawRatio: number;
      modifiedRatio: number;
      personalBestRawRatio: number;
      personalBestModifiedRatio: number;
      modifiersMultiplier: number;
      modifiers: never[];
    };
    winTracker: {
      won: boolean;
      rank: string;
      endTime: number;
      nbOfPause: number;
    };
    distanceTracker: {
      rightSaber: number;
      leftSaber: number;
      rightHand: number;
      leftHand: number;
    };
    scoreGraphTracker: {
      graph: {
        "2": number;
      };
    };
  };
  deepTrackers: {
    noteTracker: {
      notes: {
        noteType: number;
        noteDirection: number;
        index: number;
        id: number;
        time: number;
        cutType: number;
        multiplier: number;
        score: number[];
        noteCenter: number[];
        noteRotation: number[];
        timeDeviation: number;
        speed: number;
        preswing: number;
        postswing: number;
        distanceToCenter: number;
        cutPoint: null;
        saberDir: null;
        cutNormal: null;
        timeDependence: number;
      }[];
    };
  };
}
