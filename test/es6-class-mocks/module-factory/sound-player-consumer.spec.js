import SoundPlayer from '../../../src/es6-class-mocks/auto-mocks/sound-player';
import SoundPlayerConsumer from '../../../src/es6-class-mocks/auto-mocks/sound-player-consumer';

const mockPlaySoundFile = jest.fn();
// mock()の第2引数にはモジュールファクトリを渡せる。
// モジュールファクトリはモックを返す関数のこと。
jest.mock('../../../src/es6-class-mocks/auto-mocks/sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return { playSoundFile: mockPlaySoundFile };
  });
});

beforeEach(() => {
  // すべてのインスタンスをクリアし、コンストラクタとすべてのメソッドを呼び出す。
  SoundPlayer.mockClear();
});

describe('Auto Mock', () => {
  it('SoundPlayerConsumerインスタンスを生成時にSoundPlayerコンストラクタが呼び出される', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);
  });

  it('SoundPlayerConsumerインスタンスを生成時に生成されたSoundPlayerインスタンスのメソッドのテスト', () => {
    // `mockClear()`が機能していることを示す
    expect(SoundPlayer).not.toHaveBeenCalled();

    // SoundPlayerConsumerインスタンスを生成時にSoundPlayerコンストラクタが呼び出されることを期待する
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(SoundPlayer).toHaveBeenCalledTimes(1);

    const coolSoundFileName = 'song.mp3';
    soundPlayerConsumer.playSomethingCool();

    // 最初に呼び出されたplaySoundFileメソッドの第1引数に渡された値は'song.mp3'であることを期待する
    expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);

    // playSoundFileメソッドが引数に'song.mp3'が渡されて呼ばれたことを期待する
    expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);

    // playSoundFileメソッドが1回呼ばれたことを期待する
    expect(mockPlaySoundFile).toHaveBeenCalledTimes(1);
  });
});
