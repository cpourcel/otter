import type { Rule } from '@angular-devkit/schematics';
import type { NgGenerateSdkSchema } from '../schema';
import * as path from 'node:path';
import { getWorkspaceConfig, WorkspaceProject } from '@o3r/schematics';

/**
 * generate the rules to adapt the SDK generated by ng cli
 * @param _options Schematic options
 * @param targetPath Path where the SDK has been generated
 * @param projectName Name of the project
 */
export function ngRegisterProjectTasks(_options: NgGenerateSdkSchema, targetPath: string, projectName: string): Rule {
  const project: WorkspaceProject = {
    projectType: 'library',
    root: targetPath,
    sourceRoot: path.posix.join(targetPath, 'src'),
    prefix: 'sdk',
    architect: {
      build: {
        builder: '@o3r/core:run-script',
        options: {
          script: 'build'
        }
      },
      lint: {
        builder: '@o3r/core:run-script',
        options: {
          script: 'lint'
        }
      },
      test: {
        builder: '@o3r/core:run-script',
        options: {
          script: 'test'
        }
      }
    }
  };

  return (tree, context) => {
    const angularJson = getWorkspaceConfig(tree);
    if (!angularJson) {
      context.logger.warn('No angular.json file detected, the update will be skipped.');
      return tree;
    }
    angularJson.projects[projectName] = {
      ...angularJson.projects[projectName],
      ...project
    };
    tree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));
    return tree;
  };
}
