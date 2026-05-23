import { Octokit } from '@octokit/rest';

export type PublishCommentInput = {
  token: string;
  owner: string;
  repo: string;
  issueNumber: number;
  body: string;
};

export async function publishComment(input: PublishCommentInput) {
  const octokit = new Octokit({
    auth: input.token,
  });

  return octokit.issues.createComment({
    owner: input.owner,
    repo: input.repo,
    issue_number: input.issueNumber,
    body: input.body,
  });
}
