import { PostProps } from '../../../../../app/entities';

export const postList: PostProps[] = [
  {
    id: 1,
    user_id: 2,
    title: 'Title 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a sapien in libero eleifend semper sit amet sit amet purus. Ut at enim venenatis, maximus libero sed, tempus dolor. Phasellus vitae risus id libero cursus feugiat a eget leo. In malesuada odio et tellus tincidunt rutrum. Proin molestie leo ipsum. Maecenas efficitur purus sit amet est malesuada, ut euismod metus rutrum. Nulla venenatis, erat ut tempor aliquet, elit est laoreet ante, at hendrerit metus enim in orci. Nulla convallis quam vitae auctor mollis. Morbi aliquam risus non commodo sodales. In hendrerit ipsum non sem egestas, non pellentesque nibh ultrices. Nulla quis tempor ligula. Donec in consectetur nisl. Mauris sit amet nisl id nisi aliquam tincidunt sit amet elementum ligula. Vivamus mattis viverra nisl. Suspendisse sit amet ante et tortor volutpat lobortis tincidunt sit amet libero. Fusce nisi mi, dignissim sit amet risus tincidunt, scelerisque porta lorem. Sed augue augue, scelerisque vel dapibus non, pharetra scelerisque arcu. Vivamus vel tincidunt mauris. Nam ultricies feugiat tellus eu maximus. Mauris malesuada viverra aliquam. In volutpat urna at felis consectetur, nec luctus ligula mattis. Nulla lorem arcu, euismod at tortor sed, sodales bibendum turpis. Vestibulum blandit congue euismod. Etiam sem lorem, porttitor a metus at, volutpat mattis ex. Proin posuere egestas lorem. Vestibulum congue purus sit amet venenatis maximus. Praesent eu ligula fermentum, accumsan libero ac, ornare enim. Sed efficitur risus ipsum, vel fringilla ipsum placerat at. Integer rutrum velit arcu, ac rutrum justo efficitur sed. Donec elementum magna malesuada lectus eleifend blandit. Sed viverra lectus eget mauris hendrerit egestas.',
    comments: [
      {
        id: 1,
        user_id: 1,
        content: 'Comment 1',
      },
      {
        id: 2,
        user_id: 1,
        content: 'Comment 2',
      },
      {
        id: 3,
        user_id: 1,
        content: 'Comment 3',
      },
    ],
  },
  {
    id: 2,
    user_id: 1,
    title: 'Title 2',
    content:
      'Vivamus arcu est, tincidunt id ligula nec, pharetra faucibus nisl. Pellentesque eget purus ac leo efficitur finibus non sed nibh. Etiam id dui at diam suscipit viverra quis at ligula. Etiam orci nisl, accumsan non magna ut, porttitor eleifend nulla. Fusce a est eu nisi porta maximus quis eget lacus. Ut tincidunt risus nulla, quis ultrices lacus varius eget. Donec congue et libero sed accumsan. Aliquam quis consequat lacus. Suspendisse tristique sem sed est commodo ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc venenatis dapibus ante, vitae consequat ipsum. In euismod tortor et orci aliquam commodo. Aenean condimentum venenatis purus, sed commodo leo iaculis in. Suspendisse potenti. Vestibulum mollis sed diam facilisis consectetur. Duis leo nibh, sollicitudin id nisi non, faucibus lacinia nibh. Mauris ut tellus et turpis rutrum ornare. In non justo nec mauris efficitur iaculis. Sed pulvinar enim dolor, sit amet fringilla neque elementum et.',
    comments: [
      {
        id: 1,
        user_id: 1,
        content: 'Comment 1',
      },
      {
        id: 2,
        user_id: 1,
        content: 'Comment 2',
      },
    ],
  },
  {
    id: 3,
    user_id: 1,
    title: 'Title 3',
    content:
      'Etiam et ullamcorper quam. Sed metus augue, pretium eget imperdiet condimentum, gravida ut quam. Donec vitae ante in nisi pretium blandit. Donec scelerisque libero in mauris rhoncus, a tempor erat lacinia. Nunc dignissim bibendum quam, a condimentum nisi ornare sed. Donec vestibulum sodales tellus, hendrerit semper mauris commodo interdum. Proin vel pellentesque purus. Vestibulum leo urna, pellentesque vestibulum lorem sit amet, ultrices ornare ligula. Fusce mi arcu, aliquet quis bibendum quis, sollicitudin ut enim. Aenean gravida tellus ac est consectetur, quis rhoncus ex fringilla. Morbi id ullamcorper dui. Vivamus accumsan enim non nisl eleifend, id imperdiet diam tincidunt. Vestibulum vel aliquet nunc. Mauris sollicitudin aliquam sapien, in varius est varius id.',
    comments: [],
  },
];
