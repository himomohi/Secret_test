# Game Balancer Skill

게임 밸런싱을 위한 수치 설계 및 조정 가이드

## 밸런싱 원칙

### 1. 난이도 곡선
```
Easy Start → Gradual Increase → Peak Challenge
```

### 2. 보상 시스템
- 노력에 비례하는 보상
- 다양한 보상 타입
- 예측 가능하지만 흥미로운 변화

### 3. 선택의 의미
- 모든 선택이 유의미해야 함
- 트레이드오프 존재
- 다양한 전략 가능

## 수치 설계 가이드

### 캐릭터 스탯 밸런싱

```javascript
// 기본 스탯 공식
const CHARACTER_STATS = {
    // 탱커형
    tank: {
        health: 100,      // 기준점
        damage: 0.6,      // 60%
        speed: 0.8,       // 80%
        defense: 1.5      // 150%
    },

    // 딜러형
    damage: {
        health: 0.7,      // 70%
        damage: 1.5,      // 150%
        speed: 1.0,       // 100%
        defense: 0.5      // 50%
    },

    // 균형형
    balanced: {
        health: 1.0,      // 100%
        damage: 1.0,      // 100%
        speed: 1.0,       // 100%
        defense: 1.0      // 100%
    },

    // 속도형
    speed: {
        health: 0.8,      // 80%
        damage: 0.9,      // 90%
        speed: 1.5,       // 150%
        defense: 0.7      // 70%
    }
};

// 총합이 대략 일정하도록 유지 (약 4.0)
```

### 레벨업 스케일링

```javascript
// 경험치 공식
function getExpForLevel(level) {
    return Math.floor(100 * Math.pow(level, 1.5));
}

// 스탯 증가 공식
function getStatIncrease(baseStat, level) {
    return baseStat + (baseStat * 0.1 * (level - 1));
}

// 적 난이도 스케일링
function getEnemyStats(baseStats, gameTime) {
    const difficulty = 1 + (gameTime / 120); // 2분마다 2배
    return {
        health: baseStats.health * difficulty,
        damage: baseStats.damage * difficulty * 0.8, // 데미지는 천천히
        speed: baseStats.speed * Math.min(difficulty, 2) // 속도는 최대 2배
    };
}
```

### 아이템 가치 계산

```javascript
// 아이템 희귀도별 스탯 보너스
const RARITY_MULTIPLIERS = {
    common: 1.0,
    uncommon: 1.5,
    rare: 2.5,
    epic: 4.0,
    legendary: 7.0
};

// 아이템 드롭률
const DROP_RATES = {
    common: 0.50,      // 50%
    uncommon: 0.30,    // 30%
    rare: 0.15,        // 15%
    epic: 0.04,        // 4%
    legendary: 0.01    // 1%
};

// 아이템 가치 평가
function calculateItemValue(item) {
    let value = 0;

    if (item.damage) value += item.damage * 10;
    if (item.health) value += item.health * 1;
    if (item.armor) value += item.armor * 5;
    if (item.speed) value += item.speed * 100 * 3;
    if (item.critChance) value += item.critChance * 1000 * 5;

    return value * RARITY_MULTIPLIERS[item.rarity];
}
```

### 스킬 밸런싱

```javascript
// DPS (초당 피해량) 계산
function calculateDPS(skill) {
    const damagePerHit = skill.damage * (skill.count || 1);
    const hitsPerSecond = 1 / skill.cooldown;
    return damagePerHit * hitsPerSecond;
}

// 스킬 가치 평가
function evaluateSkillPower(skill) {
    let score = 0;

    // 기본 DPS
    score += calculateDPS(skill);

    // 범위 보너스
    if (skill.areaSize) score *= (1 + skill.areaSize * 0.5);

    // 관통 보너스
    if (skill.pierce) score *= (1 + skill.pierce * 0.3);

    // 특수 효과
    if (skill.stun) score *= 1.5;
    if (skill.slow) score *= 1.3;
    if (skill.poison) score *= 1.4;

    return score;
}
```

## 난이도 조절

### 동적 난이도 조절 (DDA)

```javascript
class DifficultyManager {
    constructor() {
        this.playerDeaths = 0;
        this.survivalTime = 0;
        this.difficultyMultiplier = 1.0;
    }

    update(dt) {
        this.survivalTime += dt;

        // 플레이어가 너무 잘하면 난이도 증가
        if (this.survivalTime > 300 && this.playerDeaths === 0) {
            this.difficultyMultiplier = 1.2;
        }

        // 플레이어가 자주 죽으면 난이도 감소
        if (this.playerDeaths > 3) {
            this.difficultyMultiplier = 0.8;
        }
    }

    getEnemyMultiplier() {
        return this.difficultyMultiplier;
    }
}
```

## 밸런싱 테스트

### 체크리스트

#### 캐릭터 밸런스
- [ ] 모든 캐릭터가 선택 가능한가?
- [ ] 각 캐릭터의 강점이 명확한가?
- [ ] 승률이 50% ± 10% 범위인가?

#### 아이템 밸런스
- [ ] 희귀 아이템이 확실히 좋은가?
- [ ] 일반 아이템도 의미가 있는가?
- [ ] 아이템 조합이 다양한가?

#### 스킬 밸런스
- [ ] 모든 스킬이 사용 가치가 있는가?
- [ ] 스킬 시너지가 존재하는가?
- [ ] 필수 스킬이 존재하지 않는가?

#### 난이도
- [ ] 초반이 너무 쉽거나 어렵지 않은가?
- [ ] 후반까지 도전적인가?
- [ ] 학습 곡선이 적절한가?

## 데이터 수집

### 로깅 시스템
```javascript
class BalanceLogger {
    constructor() {
        this.data = {
            characterUsage: {},
            itemPickups: {},
            skillUsage: {},
            playerDeaths: [],
            avgSurvivalTime: []
        };
    }

    logCharacterSelect(characterId) {
        this.data.characterUsage[characterId] =
            (this.data.characterUsage[characterId] || 0) + 1;
    }

    logGameEnd(survivalTime, character, score) {
        this.data.avgSurvivalTime.push(survivalTime);
        // 데이터 분석...
    }

    getReport() {
        // 밸런싱 리포트 생성
        return {
            mostUsedCharacter: this.getMostUsed(this.data.characterUsage),
            avgSurvival: this.average(this.data.avgSurvivalTime),
            // ...
        };
    }
}
```

## 공식 모음

```javascript
const BALANCE_FORMULAS = {
    // 경험치
    exp: (level) => Math.floor(100 * Math.pow(level, 1.5)),

    // 체력
    health: (baseHealth, level) => baseHealth * (1 + 0.1 * (level - 1)),

    // 피해량
    damage: (baseDamage, level) => baseDamage * (1 + 0.15 * (level - 1)),

    // 크리티컬
    critDamage: (baseDamage, critMultiplier) => baseDamage * (1 + critMultiplier),

    // 방어력 감소
    damageReduction: (armor) => armor / (armor + 100),

    // 이동 속도
    speed: (baseSpeed, speedBonus) => baseSpeed * (1 + speedBonus)
};
```
