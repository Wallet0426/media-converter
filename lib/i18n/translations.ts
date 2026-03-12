export type Locale = 'ko' | 'en' | 'ja' | 'zh';

export const translations: Record<Locale, Record<string, string>> = {
  ko: {
    // Navbar
    'nav.features': '기능',
    'nav.howItWorks': '이용 방법',
    'nav.faq': 'FAQ',
    'nav.getStarted': '시작하기',
    'nav.convertNow': '지금 변환하기',

    // Hero
    'hero.badge': '빠르고 무료, 언제나',
    'hero.title1': 'YouTube & Twitch를',
    'hero.title2': 'MP3 & MP4로 변환',
    'hero.description':
      'YouTube 영상과 Twitch 다시보기를 고화질 MP3, MP4로 간편하게 변환하세요. 회원가입 없이, 제한 없이, 빠르게.',

    // Converter
    'converter.placeholder': 'YouTube 또는 Twitch VOD 링크를 붙여넣으세요...',
    'converter.mp3': 'MP3 (오디오)',
    'converter.mp4': 'MP4 (비디오)',
    'converter.bestQuality': '최고 화질',
    'converter.4k': '4K (2160p)',
    'converter.1440p': '1440p',
    'converter.1080p': '1080p',
    'converter.720p': '720p',
    'converter.480p': '480p',
    'converter.bestAudio': '최고 음질 (320kbps)',
    'converter.256kbps': '고음질 (256kbps)',
    'converter.192kbps': '표준 (192kbps)',
    'converter.128kbps': '저용량 (128kbps)',
    'converter.convert': '변환하기',
    'converter.converting': '변환 중...',
    'converter.highQuality': '고화질',
    'converter.noAds': '광고 없음',
    'converter.secure': '안전',
    'converter.convertAnother': '다른 영상 변환하기',
    'converter.tryAgain': '다시 시도',
    'converter.serverError': '서버 연결에 실패했습니다.',
    'converter.requestFailed': '요청에 실패했습니다.',

    // Progress
    'progress.pending': '준비 중...',
    'progress.downloading': '다운로드 중...',
    'progress.converting': '변환 중...',
    'progress.done': '완료!',
    'progress.error': '오류 발생',

    // Download
    'download.button': '다운로드',

    // Features
    'features.title': '왜 TubeConvert인가요?',
    'features.subtitle':
      '크리에이터와 일반 사용자 모두를 위한 최고의 변환 도구를 제공합니다.',
    'features.fast.title': '번개처럼 빠른 속도',
    'features.fast.desc':
      '몇 초 만에 변환이 완료됩니다. 더 이상 긴 대기열을 기다릴 필요가 없습니다.',
    'features.secure.title': '안전하고 보안 유지',
    'features.secure.desc':
      '개인정보를 최우선으로 보호합니다. 데이터나 변환한 영상을 저장하지 않습니다.',
    'features.mobile.title': '모바일 지원',
    'features.mobile.desc':
      '스마트폰, 태블릿, PC 어디서든 간편하게 변환하고 다운로드하세요.',

    // How it Works
    'howItWorks.title': '이용 방법',
    'howItWorks.subtitle': '3단계로 간단하게 변환할 수 있습니다.',
    'howItWorks.step1.title': '링크 붙여넣기',
    'howItWorks.step1.desc':
      'YouTube 영상이나 Twitch 다시보기의 URL을 복사해서 입력창에 붙여넣으세요.',
    'howItWorks.step2.title': '포맷 선택',
    'howItWorks.step2.desc':
      'MP3(오디오) 또는 MP4(비디오)를 선택하고, 원하는 화질을 설정하세요.',
    'howItWorks.step3.title': '다운로드',
    'howItWorks.step3.desc':
      '변환이 완료되면 다운로드 버튼을 클릭하여 파일을 저장하세요.',

    // Stats
    'stats.formats': 'MP3 & MP4',
    'stats.formatsLabel': '지원 포맷',
    'stats.platforms': 'YouTube & Twitch',
    'stats.platformsLabel': '지원 플랫폼',
    'stats.price': '100%',
    'stats.priceLabel': '무료',
    'stats.quality': '최대 4K',
    'stats.qualityLabel': '고화질 지원',

    // FAQ
    'faq.title': '자주 묻는 질문',
    'faq.subtitle': '궁금한 점이 있으신가요? 아래에서 답변을 확인하세요.',
    'faq.q1': '어떤 플랫폼을 지원하나요?',
    'faq.a1':
      'YouTube 영상(일반 영상, Shorts 포함)과 Twitch 다시보기(VOD)를 지원합니다.',
    'faq.q2': 'MP3와 MP4의 차이는 무엇인가요?',
    'faq.a2':
      'MP3는 오디오만 추출하여 음악이나 팟캐스트로 들을 수 있고, MP4는 영상과 오디오를 모두 포함합니다.',
    'faq.q3': '변환에 얼마나 걸리나요?',
    'faq.a3':
      '영상의 길이와 화질에 따라 다르지만, 일반적으로 몇 초에서 수 분 내로 완료됩니다.',
    'faq.q4': '변환된 파일은 얼마나 보관되나요?',
    'faq.a4':
      '변환된 파일은 서버에 30분간 보관된 후 자동 삭제됩니다. 완료 즉시 다운로드해주세요.',
    'faq.q5': '정말 무료인가요?',
    'faq.a5':
      '네, 완전히 무료입니다. 회원가입, 결제, 숨겨진 비용 없이 자유롭게 사용하세요.',
    'faq.q6': '모바일에서도 사용할 수 있나요?',
    'faq.a6':
      '네, 모든 기기의 브라우저에서 사용 가능합니다. 별도 앱 설치는 필요하지 않습니다.',

    // Footer
    'footer.description':
      '가장 빠르고 안정적인 YouTube & Twitch 변환기입니다. 좋아하는 음악과 영상을 무료로 다운로드하세요.',
    'footer.product': '서비스',
    'footer.mp3': 'MP3 변환',
    'footer.mp4': 'MP4 변환',
    'footer.howItWorks': '이용 방법',
    'footer.faq': '자주 묻는 질문',
    'footer.legal': '법적 고지',
    'footer.terms': '이용약관',
    'footer.privacy': '개인정보 처리방침',
    'footer.disclaimer': '면책 조항',
    'footer.copyright': '© {year} TubeConvert. All rights reserved.',
    'footer.madeWith': '콘텐츠를 사랑하는 분들을 위해 제작',
    'footer.personalUse': '⚠️ 개인 사용 목적으로만 이용해 주세요.',
  },

  en: {
    'nav.features': 'Features',
    'nav.howItWorks': 'How it works',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Get Started',
    'nav.convertNow': 'Convert Now',

    'hero.badge': 'Fast & Free Forever',
    'hero.title1': 'Convert YouTube & Twitch to',
    'hero.title2': 'MP3 & MP4 Instantly',
    'hero.description':
      'The simplest way to download your favorite YouTube & Twitch content in high quality. No registration, no limits, just pure speed.',

    'converter.placeholder': 'Paste a YouTube or Twitch VOD link here...',
    'converter.mp3': 'MP3 (Audio)',
    'converter.mp4': 'MP4 (Video)',
    'converter.bestQuality': 'Best Quality',
    'converter.4k': '4K (2160p)',
    'converter.1440p': '1440p',
    'converter.1080p': '1080p',
    'converter.720p': '720p',
    'converter.480p': '480p',
    'converter.bestAudio': 'Best (320kbps)',
    'converter.256kbps': 'High (256kbps)',
    'converter.192kbps': 'Standard (192kbps)',
    'converter.128kbps': 'Low (128kbps)',
    'converter.convert': 'Convert',
    'converter.converting': 'Converting...',
    'converter.highQuality': 'High Quality',
    'converter.noAds': 'No Ads',
    'converter.secure': 'Secure',
    'converter.convertAnother': 'Convert another video',
    'converter.tryAgain': 'Try again',
    'converter.serverError': 'Failed to connect to server.',
    'converter.requestFailed': 'Request failed.',

    'progress.pending': 'Preparing...',
    'progress.downloading': 'Downloading...',
    'progress.converting': 'Converting...',
    'progress.done': 'Done!',
    'progress.error': 'Error occurred',

    'download.button': 'Download',

    'features.title': 'Why choose TubeConvert?',
    'features.subtitle':
      'We provide the best tools for content creators and casual listeners alike.',
    'features.fast.title': 'Lightning Fast',
    'features.fast.desc':
      'Your requests are processed in seconds. No more waiting in long conversion queues.',
    'features.secure.title': 'Safe & Secure',
    'features.secure.desc':
      'Your privacy is our priority. We never store your data or the videos you convert.',
    'features.mobile.title': 'Mobile Friendly',
    'features.mobile.desc':
      'Convert and download directly on your phone, tablet, or desktop with ease.',

    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Convert your media in just 3 simple steps.',
    'howItWorks.step1.title': 'Paste the Link',
    'howItWorks.step1.desc':
      'Copy the URL of a YouTube video or Twitch VOD and paste it into the input field.',
    'howItWorks.step2.title': 'Choose Format',
    'howItWorks.step2.desc':
      'Select MP3 (audio) or MP4 (video), and pick your preferred quality.',
    'howItWorks.step3.title': 'Download',
    'howItWorks.step3.desc':
      'Once conversion is complete, click the download button to save your file.',

    'stats.formats': 'MP3 & MP4',
    'stats.formatsLabel': 'Supported Formats',
    'stats.platforms': 'YouTube & Twitch',
    'stats.platformsLabel': 'Supported Platforms',
    'stats.price': '100%',
    'stats.priceLabel': 'Free',
    'stats.quality': 'Up to 4K',
    'stats.qualityLabel': 'High Quality',

    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Have a question? Find your answer below.',
    'faq.q1': 'Which platforms are supported?',
    'faq.a1':
      'We support YouTube videos (including Shorts) and Twitch VODs (past broadcasts).',
    'faq.q2': 'What is the difference between MP3 and MP4?',
    'faq.a2':
      'MP3 extracts audio only — perfect for music and podcasts. MP4 includes both video and audio.',
    'faq.q3': 'How long does conversion take?',
    'faq.a3':
      'It depends on the video length and quality, but usually completes within seconds to a few minutes.',
    'faq.q4': 'How long are converted files stored?',
    'faq.a4':
      'Files are stored on our server for 30 minutes and then automatically deleted. Please download immediately.',
    'faq.q5': 'Is it really free?',
    'faq.a5':
      'Yes, completely free. No registration, no payment, no hidden costs.',
    'faq.q6': 'Can I use it on mobile?',
    'faq.a6':
      'Yes, it works on any device with a browser. No app installation required.',

    'footer.description':
      'The fastest and most reliable YouTube & Twitch converter. Download your favorite music and videos in high quality for free.',
    'footer.product': 'Product',
    'footer.mp3': 'MP3 Converter',
    'footer.mp4': 'MP4 Converter',
    'footer.howItWorks': 'How It Works',
    'footer.faq': 'FAQ',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.disclaimer': 'Disclaimer',
    'footer.copyright': '© {year} TubeConvert. All rights reserved.',
    'footer.madeWith': 'Made with ❤️ for content lovers',
    'footer.personalUse': '⚠️ For personal use only.',
  },

  ja: {
    'nav.features': '機能',
    'nav.howItWorks': '使い方',
    'nav.faq': 'FAQ',
    'nav.getStarted': '始める',
    'nav.convertNow': '今すぐ変換',

    'hero.badge': '高速・無料・いつでも',
    'hero.title1': 'YouTube & Twitchを',
    'hero.title2': 'MP3 & MP4に即変換',
    'hero.description':
      'YouTube動画やTwitchアーカイブを高画質のMP3・MP4に簡単に変換。登録不要、制限なし、高速処理。',

    'converter.placeholder': 'YouTubeまたはTwitch VODのリンクを貼り付け...',
    'converter.mp3': 'MP3（音声）',
    'converter.mp4': 'MP4（動画）',
    'converter.bestQuality': '最高画質',
    'converter.4k': '4K (2160p)',
    'converter.1440p': '1440p',
    'converter.1080p': '1080p',
    'converter.720p': '720p',
    'converter.480p': '480p',
    'converter.bestAudio': '最高音質（320kbps）',
    'converter.256kbps': '高音質（256kbps）',
    'converter.192kbps': '標準（192kbps）',
    'converter.128kbps': '低容量（128kbps）',
    'converter.convert': '変換する',
    'converter.converting': '変換中...',
    'converter.highQuality': '高画質',
    'converter.noAds': '広告なし',
    'converter.secure': '安全',
    'converter.convertAnother': '別の動画を変換する',
    'converter.tryAgain': 'もう一度',
    'converter.serverError': 'サーバーへの接続に失敗しました。',
    'converter.requestFailed': 'リクエストに失敗しました。',

    'progress.pending': '準備中...',
    'progress.downloading': 'ダウンロード中...',
    'progress.converting': '変換中...',
    'progress.done': '完了！',
    'progress.error': 'エラー発生',

    'download.button': 'ダウンロード',

    'features.title': 'TubeConvertが選ばれる理由',
    'features.subtitle':
      'クリエイターにもリスナーにも最適な変換ツールを提供します。',
    'features.fast.title': '超高速変換',
    'features.fast.desc':
      '数秒で変換が完了します。長い待ち時間はもう必要ありません。',
    'features.secure.title': '安全・安心',
    'features.secure.desc':
      'プライバシーを最優先に保護。データや動画を保存しません。',
    'features.mobile.title': 'モバイル対応',
    'features.mobile.desc':
      'スマートフォン、タブレット、PCなど、どのデバイスでも簡単に利用できます。',

    'howItWorks.title': '使い方',
    'howItWorks.subtitle': '3つのステップで簡単に変換できます。',
    'howItWorks.step1.title': 'リンクを貼り付け',
    'howItWorks.step1.desc':
      'YouTube動画やTwitchアーカイブのURLをコピーして入力欄に貼り付けます。',
    'howItWorks.step2.title': 'フォーマット選択',
    'howItWorks.step2.desc':
      'MP3（音声）またはMP4（動画）を選択し、お好みの画質を設定します。',
    'howItWorks.step3.title': 'ダウンロード',
    'howItWorks.step3.desc':
      '変換が完了したら、ダウンロードボタンをクリックしてファイルを保存します。',

    'stats.formats': 'MP3 & MP4',
    'stats.formatsLabel': '対応フォーマット',
    'stats.platforms': 'YouTube & Twitch',
    'stats.platformsLabel': '対応プラットフォーム',
    'stats.price': '100%',
    'stats.priceLabel': '無料',
    'stats.quality': '最大4K',
    'stats.qualityLabel': '高画質対応',

    'faq.title': 'よくある質問',
    'faq.subtitle': 'ご質問がありますか？以下で回答をご確認ください。',
    'faq.q1': '対応しているプラットフォームは？',
    'faq.a1':
      'YouTube動画（Shorts含む）とTwitchのアーカイブ（VOD）に対応しています。',
    'faq.q2': 'MP3とMP4の違いは？',
    'faq.a2':
      'MP3は音声のみを抽出します。音楽やポッドキャストに最適です。MP4は映像と音声の両方を含みます。',
    'faq.q3': '変換にどれくらい時間がかかりますか？',
    'faq.a3':
      '動画の長さと画質によりますが、通常は数秒から数分で完了します。',
    'faq.q4': '変換したファイルはどれくらい保存されますか？',
    'faq.a4':
      'ファイルはサーバーに30分間保存された後、自動的に削除されます。完了後すぐにダウンロードしてください。',
    'faq.q5': '本当に無料ですか？',
    'faq.a5':
      'はい、完全に無料です。登録、支払い、隠れた費用は一切ありません。',
    'faq.q6': 'モバイルでも使えますか？',
    'faq.a6':
      'はい、ブラウザがあるすべてのデバイスで利用できます。アプリのインストールは不要です。',

    'footer.description':
      '最速で信頼性の高いYouTube & Twitch変換ツール。お気に入りの音楽や動画を高画質で無料ダウンロード。',
    'footer.product': 'サービス',
    'footer.mp3': 'MP3変換',
    'footer.mp4': 'MP4変換',
    'footer.howItWorks': '使い方',
    'footer.faq': 'よくある質問',
    'footer.legal': '法的情報',
    'footer.terms': '利用規約',
    'footer.privacy': 'プライバシーポリシー',
    'footer.disclaimer': '免責事項',
    'footer.copyright': '© {year} TubeConvert. All rights reserved.',
    'footer.madeWith': 'コンテンツを愛する皆さまのために',
    'footer.personalUse': '⚠️ 個人利用目的でのみご使用ください。',
  },

  zh: {
    'nav.features': '功能',
    'nav.howItWorks': '使用方法',
    'nav.faq': '常见问题',
    'nav.getStarted': '开始使用',
    'nav.convertNow': '立即转换',

    'hero.badge': '快速、免费、永久',
    'hero.title1': '将 YouTube 和 Twitch 转换为',
    'hero.title2': 'MP3 和 MP4',
    'hero.description':
      '将 YouTube 视频和 Twitch 回放轻松转换为高质量的 MP3、MP4。无需注册，无限制，极速转换。',

    'converter.placeholder': '粘贴 YouTube 或 Twitch VOD 链接...',
    'converter.mp3': 'MP3（音频）',
    'converter.mp4': 'MP4（视频）',
    'converter.bestQuality': '最佳画质',
    'converter.4k': '4K (2160p)',
    'converter.1440p': '1440p',
    'converter.1080p': '1080p',
    'converter.720p': '720p',
    'converter.480p': '480p',
    'converter.bestAudio': '最佳音质（320kbps）',
    'converter.256kbps': '高音质（256kbps）',
    'converter.192kbps': '标准（192kbps）',
    'converter.128kbps': '低容量（128kbps）',
    'converter.convert': '转换',
    'converter.converting': '转换中...',
    'converter.highQuality': '高画质',
    'converter.noAds': '无广告',
    'converter.secure': '安全',
    'converter.convertAnother': '转换其他视频',
    'converter.tryAgain': '重试',
    'converter.serverError': '无法连接到服务器。',
    'converter.requestFailed': '请求失败。',

    'progress.pending': '准备中...',
    'progress.downloading': '下载中...',
    'progress.converting': '转换中...',
    'progress.done': '完成！',
    'progress.error': '发生错误',

    'download.button': '下载',

    'features.title': '为什么选择 TubeConvert？',
    'features.subtitle': '为创作者和普通用户提供最佳转换工具。',
    'features.fast.title': '闪电般的速度',
    'features.fast.desc':
      '几秒钟内完成转换。无需再等待漫长的转换队列。',
    'features.secure.title': '安全可靠',
    'features.secure.desc':
      '我们优先保护您的隐私。不存储任何数据或转换的视频。',
    'features.mobile.title': '移动端适配',
    'features.mobile.desc':
      '在手机、平板或电脑上轻松转换和下载。',

    'howItWorks.title': '使用方法',
    'howItWorks.subtitle': '只需3个简单步骤即可完成转换。',
    'howItWorks.step1.title': '粘贴链接',
    'howItWorks.step1.desc':
      '复制 YouTube 视频或 Twitch 回放的 URL，粘贴到输入框中。',
    'howItWorks.step2.title': '选择格式',
    'howItWorks.step2.desc':
      '选择 MP3（音频）或 MP4（视频），并设置所需的画质。',
    'howItWorks.step3.title': '下载',
    'howItWorks.step3.desc':
      '转换完成后，点击下载按钮保存文件。',

    'stats.formats': 'MP3 & MP4',
    'stats.formatsLabel': '支持格式',
    'stats.platforms': 'YouTube & Twitch',
    'stats.platformsLabel': '支持平台',
    'stats.price': '100%',
    'stats.priceLabel': '免费',
    'stats.quality': '最高4K',
    'stats.qualityLabel': '高画质支持',

    'faq.title': '常见问题',
    'faq.subtitle': '有疑问？请在下方查找答案。',
    'faq.q1': '支持哪些平台？',
    'faq.a1': '支持 YouTube 视频（包括 Shorts）和 Twitch 回放（VOD）。',
    'faq.q2': 'MP3 和 MP4 有什么区别？',
    'faq.a2':
      'MP3 仅提取音频，适合听音乐和播客。MP4 同时包含视频和音频。',
    'faq.q3': '转换需要多长时间？',
    'faq.a3': '取决于视频长度和画质，通常几秒到几分钟内完成。',
    'faq.q4': '转换后的文件保存多久？',
    'faq.a4':
      '文件在服务器上保存30分钟后自动删除。请在完成后立即下载。',
    'faq.q5': '真的免费吗？',
    'faq.a5': '是的，完全免费。无需注册、付款，没有隐藏费用。',
    'faq.q6': '可以在手机上使用吗？',
    'faq.a6': '可以，在任何带浏览器的设备上均可使用。无需安装应用程序。',

    'footer.description':
      '最快、最可靠的 YouTube 和 Twitch 转换器。免费下载高质量的音乐和视频。',
    'footer.product': '服务',
    'footer.mp3': 'MP3 转换',
    'footer.mp4': 'MP4 转换',
    'footer.howItWorks': '使用方法',
    'footer.faq': '常见问题',
    'footer.legal': '法律信息',
    'footer.terms': '服务条款',
    'footer.privacy': '隐私政策',
    'footer.disclaimer': '免责声明',
    'footer.copyright': '© {year} TubeConvert. All rights reserved.',
    'footer.madeWith': '为热爱内容的你而制作',
    'footer.personalUse': '⚠️ 请仅用于个人用途。',
  },
};

