import {join} from 'path';
import {ng} from '../../utils/process';
import {
  expectFileToExist, writeFile,
  expectFileToMatch
} from '../../utils/fs';
import { getGlobalVariable } from '../../utils/env';


export default function() {
  // TODO(architect): Delete this test. It is now in devkit/build-angular.
  if (!getGlobalVariable('argv')['ve']) {
    return;
  }

  return ng('generate', 'component', 'i18n-test')
    .then(() =>
      writeFile(join('src/app/i18n-test', 'i18n-test.component.html'), '<p i18n>Hello world</p>'),
    )
    .then(() => ng('xi18n', '--format', 'xmb'))
    .then(() => expectFileToExist('messages.xmb'))
    .then(() => expectFileToMatch('messages.xmb', /Hello world/));
}
