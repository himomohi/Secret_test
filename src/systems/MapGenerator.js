class MapGenerator {
    constructor(game) {
        this.game = game;
    }

    generate(width, height) {
        const map = {
            width: width,
            height: height,
            tiles: [],
            getTile: function(x, y) {
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 1;
                return this.tiles[y * this.width + x];
            },
            setTile: function(x, y, value) {
                if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    this.tiles[y * this.width + x] = value;
                }
            }
        };

        // 초기화 - 모든 타일을 잔디로
        for (let i = 0; i < width * height; i++) {
            map.tiles[i] = 0;
        }

        // 테두리에 벽 생성
        for (let x = 0; x < width; x++) {
            map.setTile(x, 0, 1);
            map.setTile(x, height - 1, 1);
        }
        for (let y = 0; y < height; y++) {
            map.setTile(0, y, 1);
            map.setTile(width - 1, y, 1);
        }

        // 랜덤 벽 생성 (방 시스템)
        this.generateRooms(map, width, height);

        // 랜덤 나무 생성
        this.generateTrees(map, width, height);

        return map;
    }

    generateRooms(map, width, height) {
        const roomCount = 8 + Math.floor(Math.random() * 5);

        for (let i = 0; i < roomCount; i++) {
            const roomWidth = 10 + Math.floor(Math.random() * 15);
            const roomHeight = 10 + Math.floor(Math.random() * 15);
            const roomX = 5 + Math.floor(Math.random() * (width - roomWidth - 10));
            const roomY = 5 + Math.floor(Math.random() * (height - roomHeight - 10));

            // 방 테두리에 벽 생성 (50% 확률)
            if (Math.random() < 0.5) {
                for (let x = roomX; x < roomX + roomWidth; x++) {
                    map.setTile(x, roomY, 1);
                    map.setTile(x, roomY + roomHeight - 1, 1);
                }
                for (let y = roomY; y < roomY + roomHeight; y++) {
                    map.setTile(roomX, y, 1);
                    map.setTile(roomX + roomWidth - 1, y, 1);
                }

                // 문 생성 (랜덤 위치)
                const doorCount = 1 + Math.floor(Math.random() * 3);
                for (let d = 0; d < doorCount; d++) {
                    const side = Math.floor(Math.random() * 4);
                    let doorX, doorY;

                    if (side === 0) { // 위쪽
                        doorX = roomX + 2 + Math.floor(Math.random() * (roomWidth - 4));
                        doorY = roomY;
                    } else if (side === 1) { // 아래쪽
                        doorX = roomX + 2 + Math.floor(Math.random() * (roomWidth - 4));
                        doorY = roomY + roomHeight - 1;
                    } else if (side === 2) { // 왼쪽
                        doorX = roomX;
                        doorY = roomY + 2 + Math.floor(Math.random() * (roomHeight - 4));
                    } else { // 오른쪽
                        doorX = roomX + roomWidth - 1;
                        doorY = roomY + 2 + Math.floor(Math.random() * (roomHeight - 4));
                    }

                    map.setTile(doorX, doorY, 0);
                }
            }
        }
    }

    generateTrees(map, width, height) {
        const treeCount = 150 + Math.floor(Math.random() * 100);

        for (let i = 0; i < treeCount; i++) {
            const x = 2 + Math.floor(Math.random() * (width - 4));
            const y = 2 + Math.floor(Math.random() * (height - 4));

            // 중앙 근처에는 나무를 적게 배치
            const centerX = width / 2;
            const centerY = height / 2;
            const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            if (distanceFromCenter < 20) {
                if (Math.random() < 0.8) continue; // 80% 확률로 스킵
            }

            // 이미 벽이 있으면 스킵
            if (map.getTile(x, y) === 1) continue;

            map.setTile(x, y, 2);
        }
    }
}
