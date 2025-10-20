// 적 데이터
const ENEMIES = [
    // 기본 적들
    { id: 'slime', name: '슬라임', health: 20, damage: 5, speed: 40, size: 16, color: '#44ff44', scoreValue: 10, expValue: 5 },
    { id: 'goblin', name: '고블린', health: 30, damage: 8, speed: 60, size: 18, color: '#88aa44', scoreValue: 15, expValue: 8 },
    { id: 'skeleton', name: '해골', health: 40, damage: 10, speed: 50, size: 20, color: '#dddddd', scoreValue: 20, expValue: 10 },
    { id: 'zombie', name: '좀비', health: 60, damage: 12, speed: 35, size: 22, color: '#88cc88', scoreValue: 25, expValue: 12 },
    { id: 'orc', name: '오크', health: 80, damage: 15, speed: 55, size: 24, color: '#668844', scoreValue: 30, expValue: 15 },

    // 중급 적들
    { id: 'ghost', name: '유령', health: 50, damage: 18, speed: 70, size: 20, color: '#aaccff', scoreValue: 35, expValue: 18, phaseThrough: true },
    { id: 'demon', name: '악마', health: 100, damage: 20, speed: 65, size: 26, color: '#aa0000', scoreValue: 50, expValue: 25 },
    { id: 'vampire', name: '뱀파이어', health: 90, damage: 22, speed: 75, size: 24, color: '#cc0044', scoreValue: 55, expValue: 28, lifesteal: 0.3 },
    { id: 'werewolf', name: '늑대인간', health: 110, damage: 25, speed: 85, size: 26, color: '#8b6914', scoreValue: 60, expValue: 30 },
    { id: 'gargoyle', name: '가고일', health: 130, damage: 18, speed: 45, size: 28, color: '#666666', scoreValue: 65, expValue: 32, armor: 10 },

    // 상급 적들
    { id: 'dragon_whelp', name: '어린 용', health: 150, damage: 30, speed: 60, size: 30, color: '#ff4444', scoreValue: 80, expValue: 40 },
    { id: 'lich', name: '리치', health: 120, damage: 35, speed: 50, size: 26, color: '#8844ff', scoreValue: 90, expValue: 45, summon: true },
    { id: 'minotaur', name: '미노타우로스', health: 200, damage: 40, speed: 55, size: 32, color: '#996633', scoreValue: 100, expValue: 50 },
    { id: 'elemental', name: '원소정령', health: 100, damage: 28, speed: 65, size: 24, color: '#88aaff', scoreValue: 75, expValue: 38 },
    { id: 'dark_knight', name: '암흑기사', health: 180, damage: 35, speed: 60, size: 28, color: '#440044', scoreValue: 95, expValue: 48, armor: 15 },

    // 보스급
    { id: 'dragon', name: '드래곤', health: 500, damage: 60, speed: 70, size: 48, color: '#ff0000', scoreValue: 500, expValue: 250, boss: true },
    { id: 'demon_lord', name: '마왕', health: 800, damage: 80, speed: 65, size: 52, color: '#880000', scoreValue: 800, expValue: 400, boss: true },
    { id: 'ancient_lich', name: '고대 리치', health: 600, damage: 70, speed: 55, size: 44, color: '#6633ff', scoreValue: 600, expValue: 300, boss: true, summon: true }
];
